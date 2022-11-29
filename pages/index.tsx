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
import { NextPageWithLayout } from "@/models";
import { MainLayout } from "component/layout";
import { Seo } from "@/component/common/seo";
import { FleekImageList } from "@/component/home";


const Home: NextPageWithLayout = () => {
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

  console.log(posts)
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
    <Seo
				data={{
					title: 'Blockchain | Update',
					description:
						'Step by step tutorials to build a full CRUD website using NextJS for beginners',
					url: 'https://learn-nextjs-fawn.vercel.app/',
					thumbnailUrl:
						'https://cdn.getshifter.co/caa65008efb706a8bfc6f7e4045d6a018420c3df/uploads/2020/11/nextjs.png',
				}}
			/>
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
      <FleekImageList lists={posts}/>
    
      <ImageList cols={matches?4:2}>
        {posts.map((item) => (
          <ImageListItem key={item.hash}>
            <Image 
            width={246}
            height={180}
            // style={{height:matches?"300px":"150px"}}
            src={`${item.publicUrl}?w=264&h=264&fit=crop&auto=format`} layout="responsive" alt="avatar" 
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
      {/* <Modal
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
      </Modal> */}
    </>
  );
}
Home.Layout = MainLayout
export default Home