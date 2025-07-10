import { useState } from "react";
import { toast } from "react-toastify";
import {
  useUpdateProductsMutation,
  useGetProductById,
  useDeleteProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/CategoryApiSlice";
import { useNavigate, useParams } from "react-router-dom";

const ProductUpdates = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default ProductUpdates;
