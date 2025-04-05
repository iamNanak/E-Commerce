import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/CategoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";

function CategoryList() {
  const { data: categories } = useFetchCategoriesQuery();
  console.log("categories: ", categories);
  const [name, setName] = useState("");
  const [selectCategory, setSelectCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category Name is Requrired");
      return;
    }

    try {
      const res = await createCategory({ name }).unwrap();
      if (res.error) {
        return toast.error(result.error);
      }
      setName("");
      toast.success(`${res.name} category is created`);
    } catch (error) {
      console.error(error);
      toast.error("Can't create Category");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updateName) {
      toast.error("Require Category Name");
      return;
    }

    try {
      const update = await updateCategory({
        categoryId: selectCategory._id,
        updatedCategory: { name: updateName },
      }).unwrap();
      // console.log(update);
      if (update.error) {
        return toast.error(update.error);
      }

      toast.success(`${update.name} is updated`);
      setSelectCategory(null);
      setUpdateName("");
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (e) => {
    try {
      const res = await deleteCategory(selectCategory._id).unwrap();

      if (res.error) {
        return toast.error(res.error);
      }
      setSelectCategory(null);
      setModalVisible(false);
      return toast.success(`${res.name} deleted successfully`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-black border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectCategory(category);
                  setUpdateName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        {
          <Modal
            isOpen={modalVisible}
            onClose={() => {
              setModalVisible(false);
            }}
          >
            <CategoryForm
              value={updateName}
              setValue={(value) => setUpdateName(value)}
              handleSubmit={handleUpdateCategory}
              handleDelete={handleDeleteCategory}
              button="Update Category"
            />
          </Modal>
        }
      </div>
    </div>
  );
}

export default CategoryList;
