
let KHOA_LIST = [];

function SearchBar({ search, setSearch, handleSearch }) {
    return (
        <form id="searchForm">  
            <label for="txtTuKhoa">Từ khóa:</label>  
            <input type="search" id="txtTuKhoa" name="txtTuKhoa" placeholder="Từ khóa cần tìm" value={search} onChange={(e) => setSearch(e.target.value)}></input>
            <button type="button" onClick={handleSearch}>Tìm kiếm</button>  
        </form> 
    );
}

function StudentTable({ students, handleDelete, handleEdit, selectedStudents, handleCheckboxChange, page, setPage, totalPage }) {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
    }

    return (
        <div id="studentTable">
            <table>  
                <thead>  
                    <tr>  
                        <th></th>  
                        <th>Mã sinh viên</th>  
                        <th>Tên sinh viên</th>  
                        <th>Ngày sinh</th>  
                        <th>Giới tính</th>  
                        <th>Khoa</th>  
                        <th>Thao tác</th>  
                    </tr>  
                </thead>  
                <tbody id="studentList">  
                {students.map((sv) => (
                    <tr key={sv.maSinhVien}>
                        <td><input
                            type="checkbox"
                            checked={selectedStudents.includes(sv.maSinhVien)}
                            onChange={() => handleCheckboxChange(sv.maSinhVien)}
                        /></td>
                        <td>{sv.maSinhVien}</td>
                        <td>{sv.tenSinhVien}</td>
                        <td>{sv.ngaySinh}</td>
                        <td>{sv.gioiTinh}</td>
                        <td>{(KHOA_LIST.find(khoa => khoa.maKhoa === sv.maKhoa) || {}).tenKhoa || "Không xác định"}</td>
                        <td>
                            <a href="#" onClick={() => handleEdit(sv)}><i class="fas fa-edit"></i></a> | 
                            <a href="#" onClick={() => handleDelete(sv.maSinhVien)}><i class="fas fa-trash"></i></a>
                        </td>
                    </tr>
                ))}
                </tbody>  
            </table>
            <div>
                <button hidden={page == 1} onClick={() => setPage(1)}>Trang đầu</button>
                {pages.map(num => (
                    <button key={num} onClick={() => setPage(num)} 
                        style={{ fontWeight: page == num ? "bold" : "normal" }} >{num}</button>
                ))}
                <button hidden={page == totalPage} onClick={() => setPage(totalPage)}>Trang cuối</button>
            </div>
        </div>
    );
}

function StudentForm({ form, handleChange, handleSubmit, handleReset, handleMultipleDelete }) {
    return (
        <form id="studentInfoForm">  
            <div className="form-group">
                <button type="button" onClick={handleReset}>Reset Form</button>
                <button type="button" onClick={handleSubmit}>{form.isEditing ? "Cập nhật" : "Thêm mới"}</button>
                <button type="button" onClick={handleMultipleDelete}>Xóa</button> 
            </div>
            <div className="form-group">  
                <label class="required" for="txtMaSV">Mã SV:</label>  
                <input type="text" id="txtMaSV" name="maSinhVien" value={form.maSinhVien} onChange={handleChange} readOnly={form.isEditing} required />
            </div>  
            <div className="form-group">  
                <label class="required" for="txtTenSV">Tên sinh viên:</label>  
                <input type="text" id="txtTenSV" name="tenSinhVien" value={form.tenSinhVien} onChange={handleChange} required /> 
            </div>  
            <div className="form-group"> 
                <label for="txtNgaySinh">Ngày sinh:</label>  
                <input type="date" id="txtNgaySinh" name="ngaySinh" value={form.ngaySinh} onChange={handleChange} /> 
            </div>  
            <div className="form-group">  
                <label>Giới tính:</label>  
                <input type="radio" id="genderMale" name="gioiTinh" value="Nam" checked={form.gioiTinh === "Nam"} onChange={handleChange} />  
                <label for="genderMale">Nam</label>  
                <input type="radio" id="genderFemale" name="gioiTinh" value="Nữ" checked={form.gioiTinh === "Nữ"} onChange={handleChange} />  
                <label for="genderFemale">Nữ</label>  
            </div>  
            <div className="form-group">  
                <label class="required" for="drpKhoa">Khoa:</label> 
                <select id="drpKhoa" name="maKhoa" value={form.maKhoa} onChange={handleChange} required>
                    <option value="">Chọn Khoa</option>
                    {KHOA_LIST.map(khoa => (
                        <option key={khoa.maKhoa} value={khoa.maKhoa}>{khoa.tenKhoa}</option>
                    ))}
                </select>
            </div>  
        </form>
    );
}


function App() {
    const [sinhViens, setSinhViens] = React.useState([]);
    const [form, setForm] = React.useState({ maSinhVien: "", tenSinhVien: "", ngaySinh: "", gioiTinh: "", maKhoa: "", isEditing: false });
    const [search, setSearch] = React.useState("");
    const [selectedStudents, setSelectedStudents] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(1);

    React.useEffect(() => {
        fetchStudents(search, page);
        fetchFaculties();
    }, [page]);

    const fetchStudents = async (search, page) => {
        try {
            const response = await axios.get(`https://localhost:7006/api/Student?keyword=${search}&page=${page}`);
            setSinhViens(response.data.students);
            setTotalPage(response.data.totalPage);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sinh viên", error);
        }
    };

    const fetchFaculties = async () => {
        try {
            const response = await axios.get("https://localhost:7006/api/Faculty");
            KHOA_LIST = response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách khoa", error);
        }
    };
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.maSinhVien || !form.tenSinhVien || !form.maKhoa) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            if (form.isEditing) {
                await axios.put(`https://localhost:7006/api/Student/${form.maSinhVien}`, form);
                fetchStudents(search, page);
            } else {

                if ( sinhViens.find(sv => sv.maSinhVien == form.maSinhVien)) {
                    alert("Mã sinh viên đã có, vui lòng nhập mã sinh viên khác !");
                    return;
                }

                await axios.post("https://localhost:7006/api/Student", form);
                fetchStudents(search, page);
            }

            setForm({ maSinhVien: "", tenSinhVien: "", ngaySinh: "", gioiTinh: "", maKhoa: "", isEditing: false });
        } catch (error) {
            console.error("Lỗi khi lưu sinh viên", error);
        }
        
    };

    const handleDelete = async (maSinhVien) => {
        if (window.confirm("Bạn có chắc muốn xóa sinh viên này?")) {
            try {
                await axios.delete(`https://localhost:7006/api/Student/${maSinhVien}`);
                setSinhViens(sinhViens.filter(sv => sv.maSinhVien !== maSinhVien));
            } catch (error) {
                console.error("Lỗi khi xóa sinh viên", error);
            }
            
        }
    };

    const handleMultipleDelete = async () => {
        if (selectedStudents.length === 0) {
            alert("Vui lòng chọn ít nhất một sinh viên để xóa.");
            return;
        }
    
        if (window.confirm("Bạn có chắc chắn muốn xóa các sinh viên đã chọn không?")) {
            try {
                await Promise.all(
                    selectedStudents.map(sv => axios.delete(`https://localhost:7006/api/Student/${sv}`))
                );
    
                setSinhViens(prevSinhViens => prevSinhViens.filter(sv => !selectedStudents.includes(sv.maSinhVien)));
                setSelectedStudents([]);
            } catch (error) {
                console.error("Lỗi khi xóa sinh viên:", error);
            }
        }
    };    

    const handleCheckboxChange = (maSinhVien) => {
        setSelectedStudents(prevSelected =>
            prevSelected.includes(maSinhVien)
                ? prevSelected.filter(id => id !== maSinhVien) : [...prevSelected, maSinhVien]
        );
    };    

    const handleEdit = (sv) => {
        setForm({ ...sv, isEditing: true });
    };

    const handleSearch = async () => {
        setPage(1);
        fetchStudents(search, page);
    };

    const handleReset = () => {
        setForm({ maSinhVien: "", tenSinhVien: "", ngaySinh: "", gioiTinh: "", maKhoa: "", isEditing: false });
    };

    return (
        <div>
            <SearchBar search={search} setSearch={setSearch} handleSearch={handleSearch} />
            <StudentTable students={sinhViens} handleDelete={handleDelete} handleEdit={handleEdit} selectedStudents={selectedStudents} 
            handleCheckboxChange={handleCheckboxChange} page={page} setPage={setPage} totalPage={totalPage} />
            <StudentForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} handleReset={handleReset} handleMultipleDelete={handleMultipleDelete} />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
