import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import fleekStorage from "@fleekhq/fleek-storage-js";
import { listFilesOutput } from "@fleekhq/fleek-storage-js";
import { InferGetStaticPropsType } from "next";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";
import Image from "next/image";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  // height:100,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  // p: 4,
};

export async function getStaticProps() {
  const res = await fleekStorage.listFiles({
    apiKey: `${process.env.API_KEY}`,
    apiSecret: `${process.env.API_SECRET}`,
    getOptions: ["bucket", "key", "hash", "publicUrl"],
  });
  const posts: listFilesOutput[] = res;
  return { props: { posts } };
}

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(posts)
  const [open, setOpen] = useState(false);
  const handleOpen = (item: listFilesOutput) => {
    setItem(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [item, setItem] = useState<listFilesOutput>();
  return (
    <>
      <ImageList cols={4} rowHeight={250}>
        {posts.map((item) => (
          <ImageListItem key={item.hash} onClick={() => handleOpen(item)}>
            <img
              src={`${item.publicUrl}?w=264&h=264&fit=crop&auto=format`}
              srcSet={`${item.publicUrl}?w=264&h=264&fit=crop&auto=format&dpr=2 2x`}
              alt={item.key}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              title={item.key}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  aria-label={`star ${item.key}`}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          xx
        {/* <img
              width="100%"
              src={`${item?.publicUrl}?w=100&h=100&fit=crop&auto=format`}
              srcSet={`${item?.publicUrl}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
              alt={item?.key}
              loading="lazy"
            /> */}
        </Box>
      </Modal>
    </>
  );
}
