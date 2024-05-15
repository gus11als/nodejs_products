// schemas/product.schema.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["FOR_SALE", "SOLD_OUT"],
    default: "FOR_SALE",
  },
  createdAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

// MongoDB Document 추가 시 기본 생성되는 `_id`를 사용하도록 설정합니다.
ProductSchema.set('id', false);

// 모델로 변환하여 외부로 내보냅니다.
export default mongoose.model("Product", ProductSchema);