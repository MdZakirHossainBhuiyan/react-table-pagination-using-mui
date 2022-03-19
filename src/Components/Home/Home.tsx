import { Box, CircularProgress, Container, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';

interface Column {
    id: "title" | "url" | "created_at" | "author",
    label: string,
    minWidth?: number,
    align?: "right"
}

const columns: readonly Column[] = [
    {id: "title", label: "Title", minWidth: 170},
    {id: "url", label: "URL", minWidth: 150},
    {id: "created_at", label: "Created At", minWidth: 100},
    {id: "author", label: "Author", minWidth: 100},
]

export interface PostsInterface {
    title: string,
    url: string,
    created_at: Date,
    author: string
}

const Home = () => {
    const [posts, setPosts] = useState<PostsInterface[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [postsLength, setPostsLength] = useState<number>(0);
    const rowsPerPage: number = 20;
    const [localPage, setLocalPage] = useState<number>(1);

    const history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setPage(_page => _page + 1)
        }, 10000)

        return () => clearInterval(interval);
    },[]);

    useEffect(() => {
        getPosts();
    },[page])

    const getPosts = async () => {
        try {
            setLoading(true);

            const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`);
            const data = await response.json();

            const _posts = [...posts, ...data.hits];
            setPosts(_posts);
            setPostsLength(_posts.length);

            setLoading(false);
        } catch(error){
            setLoading(false);
        }
    }

    const handlePageChange = async (event: unknown, newPage: number) => {
        setLocalPage(newPage);
    }

    const getDetails = (post: PostsInterface) => {
        history.push({
            pathname: '/details',
            state: post
        })
    }

    return (
        <>
            <h1 style={{"textAlign": "center"}}>Post list</h1>

            {
                loading ? <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <CircularProgress size={20} />
                </Box> : <></>
            }
            <Container style={{maxWidth: "100%"}}>
                <Paper>
                    <TableContainer sx={{height: "calc(100vh - 150px)"}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {
                                        columns.map(column => 
                                            <TableCell key={column.id} align={column.align} style={{minWidth: column.minWidth}}>
                                                {column.label}
                                            </TableCell>    
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    posts.slice((localPage - 1) * rowsPerPage, (localPage - 1) * rowsPerPage + rowsPerPage).map((row, index) => {
                                        return (
                                            <TableRow key={index} onClick={() => getDetails(row)} >
                                                {
                                                    columns.map(column => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id}>
                                                                {value}
                                                            </TableCell>
                                                        )
                                                    })
                                                }
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Pagination count={postsLength / rowsPerPage} page={localPage} onChange={handlePageChange} />

                </Paper>
            </Container>
        </>
    );
};

export default Home;