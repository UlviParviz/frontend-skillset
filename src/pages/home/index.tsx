import { useEffect, useState, useMemo } from "react";
import "./index.scss";
import { Table, Stack, Search, Text } from "../../shared/components";
import type { TableColumn } from "../../shared/components/table/types";
import { useAppDispatch, useAppSelector } from "../../shared/redux/hooks";
import { fetchPosts, fetchPostById } from "../../shared/redux/posts/postThunks";
import { Post } from "../../shared/redux/posts/types";
import Pagination from "../../shared/components/pagination";
import { ITEMS_PER_PAGE } from "../../shared/constants/constants";
import Modal from "../../shared/components/modal";
import { FaInfoCircle } from "react-icons/fa";

const Home = () => {
  const dispatch = useAppDispatch();
  const { posts, selectedPost } = useAppSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleOpenModal = async (id: number) => {
    await dispatch(fetchPostById(id));
    setIsModalOpen(true);
  };

  const columns: TableColumn<Post>[] = [
    { header: "ID", accessor: "id" },
    { header: "Type", accessor: "title" },
    { header: "Language", accessor: "body" },
    {
      header: "Info",
      accessor: "id",
      cell: (row) => (
        <button
          className="info-button"
          onClick={() => handleOpenModal(row.id)}
          aria-label={`info-button-${row.id}`} 
        >
          <FaInfoCircle />
        </button>
      ),
    },
  ];

  const filteredPosts = useMemo(() => {
    const lower = searchText.toLowerCase();
    return posts.filter((post) => post.title.toLowerCase().includes(lower));
  }, [posts, searchText]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

  return (
    <Stack className="main" gap={16}>
      <Stack width={350}>
        <Search
          onSearch={(value: string) => {
            setSearchText(value);
          }}
          width="100%"
          height="40px"
          placeholder="Search post by type (title)..."
        />
      </Stack>

      <Table<Post> columns={columns} data={paginatedPosts} />

      {totalPages > 1 && (
        <Stack display="flex" justify="end" align="center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            reset={!!searchText}
          />
        </Stack>
      )}

      {selectedPost && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Post Details"
        >
          <Stack display="flex" direction="column" gap={5}>
            <Text>{selectedPost?.title}</Text>
            <Text>{selectedPost?.body}</Text>
          </Stack>
        </Modal>
      )}
    </Stack>
  );
};

export default Home;
