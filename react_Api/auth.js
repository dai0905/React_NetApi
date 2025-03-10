

const API_URL = "https://localhost:7006/api/Accounts";

window.auth = {
    signIn: async (email, password) => {
        const response = await axios.post(`${API_URL}/signin`, { email, password }, { withCredentials: true });
        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data;
    },

    signUp: async (email, password, confirmPassword) => {
        const response = await axios.post(`${API_URL}/signup`, { email, password, confirmPassword});
    },

    signOut: async () => {
        try {
            const token = localStorage.getItem("accessToken")
    
            if (!token) {
                console.warn("Không có accessToken, có thể đã đăng xuất.");
            }
    
            await axios.post(`${API_URL}/logout`, {}, {
                headers: { Authorization: `Bearer ${token}` }, 
                withCredentials: true
            });

            localStorage.removeItem("accessToken"); 
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
        }
    },

    refreshToken: async () => {
        try {
            const response = await axios.post(`${API_URL}/refresh-token`, {}, { withCredentials: true });
            localStorage.setItem("accessToken", response.data.accessToken);
            return response.data.accessToken;
        } catch (error) {
            console.error("Lỗi làm mới token:", error);
            auth.signOut();
        }
    },

    getRole: () => {
        const token = localStorage.getItem("accessToken");
        if (!token) return null;

        try {
            const decoded = jwt_decode(token);
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;

            return role;
        } catch (error) {
            console.error("Lỗi giải mã token:", error);
            return null;
        }
    }
};

function AuthForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isSignUp, setIsSignUp] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignUp) {
            if (password !== confirmPassword) {
                alert("Mật khẩu xác nhận không khớp!");
                return;
            }
            try {
                await auth.signUp(email, password, confirmPassword);
                alert("Đăng ký thành công! Vui lòng đăng nhập.");
                setIsSignUp(false);
            } catch (error) {
                alert("Đăng ký thất bại, vui lòng thử lại!");
            }
        } else {
            await handleLogIn(email, password);
        }
    };

    const handleLogIn = async () => {
        try {
            const data = await auth.signIn(email, password, confirmPassword);
            const role = auth.getRole();
        
            console.log("Token:", localStorage.getItem("accessToken"));
            console.log("Decoded Role:", role);
            if (role === "Administrator") {
                window.location.href = "app.html";
            } else {
                alert("Bạn không có quyền truy cập trang Admin!");
            }
        } catch (error) {
            alert("Đăng nhập thất bại!");
        }
    };

    return (
        <div id="auth">
            <h2>{isSignUp ? "Đăng ký" : "Đăng nhập"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Mật khẩu:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {isSignUp && (
                    <div>
                        <label>Xác nhận mật khẩu:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                )}
                <button type="submit">{isSignUp ? "Đăng ký" : "Đăng nhập"}</button>
            </form>
            <button onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}
            </button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("rootauth"));
root.render(<AuthForm />)