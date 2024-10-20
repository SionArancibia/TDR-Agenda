    "use strict";
    var __importDefault = (this && this.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    const express_1 = __importDefault(require("express"));
    const auth_1 = __importDefault(require("./routes/auth"));
    const citas_1 = __importDefault(require("./routes/citas"));
    const dotenv_1 = __importDefault(require("dotenv"));
    const cookie_parser_1 = __importDefault(require("cookie-parser"));
    const cors_1 = __importDefault(require("cors"));
    const admin_router_1 = __importDefault(require("./routes/admin.router"));
    const pacientes_1 = __importDefault(require("./routes/pacientes"));
    dotenv_1.default.config();
    const PORT = process.env.PORT || 3000;
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:5173' }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.use("/api/auth", auth_1.default);
    app.use("/api/adminCrud", admin_router_1.default);
    app.use("/api/profesional", citas_1.default);
    app.use("/api/pacientes", pacientes_1.default); 

    app.use("/api/pacientes", (req, res, next) => {
        console.log('Acceso a /api/pacientes'); 
        next();
    }, pacientesRoutes.default);
    
  
    app.listen(PORT, () => {
        console.log("Server running on port: ", PORT);
    });
