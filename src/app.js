import express from 'express';
import connect from './schemas/index.js';
import ProductRouter from "./routers/products.router.js";
// import errorHandlerMiddleware from "./middlewarmies/error-handler.middleware.js";

const app = express();
const PORT = 3000;

connect();
// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정합니다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date()); // 미들웨어 4
  next();
});

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Hi!' });
});

app.use("/api", [router, ProductRouter]); // 미들웨어 5

//에러 처리 미들웨어 등록
// app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});