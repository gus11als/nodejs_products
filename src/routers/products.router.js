import express from 'express';
import joi from 'joi';
import Product from '../schemas/product.schema.js';

const router = express.Router();

const productSchema = joi.object({
  productName: joi.string().required(),
  productDescription: joi.string().required(),
  manager: joi.string().required(),
  password: joi.string().required(),
});

// 상품 등록 API
router.post('/products', async (req, res, next) => {
  try {
    // 요청 본문 유효성 검사
    const validation = await productSchema.validateAsync(req.body);
    const { productName, productDescription, manager, password } = validation;

    // 기본 상태는 "FOR_SALE"
    const status = 'FOR_SALE';

    // 생성 일시 및 수정 일시 자동 생성
    const createdAt = new Date();
    const updatedAt = new Date();

    // 상품 생성
    const product = new Product({
      productName,
      productDescription,
      manager,
      password,
      status,
      createdAt,
      updatedAt,
    });

    // 데이터베이스에 상품 저장
    await product.save();

    // 클라이언트에게 응답 반환
    return res.status(201).json({ product: product });
  } catch (error) {
    // 에러 처리 미들웨어 실행
    next(error);
  }
});

// 상품 목록 조회 API
router.get('/products', async (req, res, next) => {
  try {
    // 상품 목록 조회
    const products = await Product.find({}, { password: 0 }) // 비밀번호 필드 제외
      .select(
        '_id productName productDescription manager status createdAt updatedAt'
      )
      .sort({ createdAt: -1 }); // 생성 일시를 내림차순으로 정렬

    // 조회된 상품 목록을 클라이언트에게 반환
    res.status(200).json({ products });
  } catch (error) {
    // 에러 발생 시 에러 처리 미들웨어로 전달
    next(error);
  }
});

// 상품 상세 조회 API
router.get('/products/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;

    // 상품 상세 정보 조회
    const product = await Product.findById(productId, '-password') // password 필드 제외
      .select('-__v'); // __v 필드 제외

    // 상품이 존재하지 않는 경우
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: '상품을 찾을 수 없습니다.' });
    }

    // 조회된 상품 정보를 클라이언트에게 반환
    res.status(200).json({ product });
  } catch (error) {
    // 에러 발생 시 에러 처리 미들웨어로 전달
    next(error);
  }
});

// 상품 수정 API
router.patch('/products/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { productName, productDescription, manager, status, password } =
      req.body;

    // 상품 조회
    const product = await Product.findById(productId);

    // 상품이 존재하지 않는 경우
    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    // 비밀번호 일치 여부 확인
    if (password !== product.password) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    // 상품 정보 부분적으로 수정
    if (productName) product.productName = productName;
    if (productDescription) product.productDescription = productDescription;
    if (manager) product.manager = manager;
    if (status) product.status = status;

    // 수정된 상품 저장
    await product.save();

    // 수정된 상품 정보를 클라이언트에게 반환
    res.status(200).json({ product });
  } catch (error) {
    // 에러 발생 시 에러 처리 미들웨어로 전달
    next(error);
  }
});

// 상품 삭제 API
router.delete('/products/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { password } = req.body;

    // 상품 조회
    const product = await Product.findById(productId);

    // 상품이 존재하지 않는 경우
    if (!product) {
      return res
        .status(404)
        .json({message: '상품을 찾을 수 없습니다.' });
    }

    // 비밀번호 일치 여부 확인
    if (password !== product.password) {
      return res
        .status(401)
        .json({message: '비밀번호가 일치하지 않습니다.' });
    }

    // 상품 삭제
    await Product.findByIdAndDelete(productId);

    // 삭제 성공 메시지 반환
    res
      .status(200)
      .json({message: '상품이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    // 에러 발생 시 에러 처리 미들웨어로 전달
    next(error);
  }
});

export default router;
