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
import { useEffect, useState } from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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

export default function Home() {
  const [posts, setPosts] = useState<listFilesOutput[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    callApi().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);
  async function callApi() {
    const res = await fleekStorage.listFiles({
      apiKey: `${process.env.NEXT_PUBLIC_API_KEY_NEW}`,
      apiSecret: `${process.env.NEXT_PUBLIC_API_SECRET_NEW}`,
      getOptions: ["bucket", "key", "hash", "publicUrl"],
    });
    return res;
  }
  const [open, setOpen] = useState(false);
  const handleOpen = (item: listFilesOutput) => {
    setItem(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [item, setItem] = useState<listFilesOutput>();
  return (
    <>
      {loading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        </Box>
      )}

      <ImageList cols={matches?4:2}>
        {posts.map((item) => (
          <ImageListItem key={item.hash}>
            <img
              src={`${item.publicUrl}?w=264&h=264&fit=crop&auto=format`}
              srcSet={`${item.publicUrl}?w=264&h=264&fit=crop&auto=format&dpr=2 2x`}
              alt={item.key}
              loading="lazy"
              style={{height:matches?"300px":"150px"}}
              onClick={() => handleOpen(item)}
            />
            <ImageListItemBar

              title={<span>Title: {item?.key?.slice(0,23)}...</span>}
              position="below"
              subtitle={<span>Hash: {item?.hash?.slice(20)}...</span>}
              actionIcon={
                <IconButton
                  // sx={{ color: "white" }}
                  aria-label={`star ${item.key}`}
                >
                  <ContentCopyIcon />
                </IconButton>
              }
              actionPosition="right"
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
          <img
            width="100%"
            src={`${item?.publicUrl}?w=100&h=100&fit=crop&auto=format`}
            srcSet={`${item?.publicUrl}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
            alt={item?.key}
            loading="lazy"
            style={{height:matches?"400px":"250px"}}
          />
        </Box>
      </Modal>
    </>
  );
}
