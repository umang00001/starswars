import axios from "axios"
import { useEffect, useState } from "react"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from 'react-bootstrap/Modal';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import moment from "moment";


const Home = () => {
    const [peopleData, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalpage] = useState(9)
    const [modalShow, setModalShow] = useState(false);
    const [modelData, setModelData] = useState({})
    const [height, setHeight] = useState(0)
    const [homeWOrld, setHomeworld] = useState({})
    //model
    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {modelData.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Height :{height} metar <br />
                        weight :{modelData?.mass} kg <br />
                        person added on API:{moment(modelData?.created).format("DD/MM/YYYY")} <br />
                        Number Of Films : {modelData?.films?.length} <br />
                    </p>
                    <h6>Homeworld Details</h6>
                    <p>
                        Name: {homeWOrld?.name} <br />
                        terrain: {homeWOrld?.terrain} <br />
                        climate :{homeWOrld?.climate} <br />
                        residents :{homeWOrld?.residents?.length}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    //change page
    const chagnePage = async (event, page) => {
        try {

            setData([])
            const { data } = await axios({
                method: "get",
                url: `https://swapi.dev/api/people/?page=${page}`
            })
            setCurrentPage(page)
            setData(data.results)
        } catch (error) {
            alert(error.message)
        }
    }

    function PaginationRounded() {
        return (
            <Stack spacing={2}>
                <Pagination defaultPage={1} count={totalPage} page={currentPage} shape="rounded" onChange={(event, page) => chagnePage(event, page)} />
            </Stack>
        );
    }



    //card
    function MediaCard({ data }) {
        return (
            <Card
                onClick={() => {
                    setModalShow(true)
                    setModelData(data)
                    calculateHeight(data)

                }}
                style={{ background: data.eye_color }}
                className={`m-3 card ${data.eye_color == "black" ? "text-white" : "text-dark"}`} sx={{ width: 200, cursor: "pointer" }}>
                <CardMedia
                    sx={{ height: 150 }}
                    image={`https://picsum.photos/id/${data.random}/200`}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {data.name}
                    </Typography>

                </CardContent>
            </Card>
        );
    }
    //get data
    const getData = async () => {
        try {
            const { data } = await axios({
                method: "get",
                url: "https://swapi.dev/api/people/"
            })
            console.log(data)
            setData(data.results)
        } catch (error) {
            alert(error.message)
        }
    }

    // calculate height
    const calculateHeight = async (data) => {
        try {
            //height
            let oldHeight = data.height * 0.0254
            oldHeight = parseFloat(oldHeight).toFixed(2)
            setHeight(oldHeight)
            // homeworld
            let results = await axios({
                method: "get",
                url: data.homeworld
            })
            console.log(results.data)
            setHomeworld(results.data)
        } catch (error) {
            alert(error.message)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            getData()
        }, 1000);
    }, [])
    const design = (
        <>
            <div className="row" style={{ height: "100vh" }}>
                {peopleData.length != 0 ? <>
                    <div className="col-md-8 d-flex align-items-center" style={{ flexWrap: "wrap" }}>
                        {
                            peopleData.map((item, index) => {
                                const random = Math.floor(Math.random() * 50 + 1)
                                item["random"] = random
                                return <MediaCard key={index} data={item} />
                            })
                        }
                    </div>
                    <div className="col-md-4 d-flex align-items-center">
                        <PaginationRounded />
                    </div>
                </>
                    :

                    <div className="d-flex justify-content-center" style={{ margin: "auto" }}>

                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>
                        <div className="spinner-grow text-secondary" role="status">
                            <span className="sr-only"></span>
                        </div>
                        <div className="spinner-grow text-success" role="status">
                            <span className="sr-only"></span>
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                            <span className="sr-only"></span>
                        </div>
                        <div className="spinner-grow text-warning" role="status">
                            <span className="sr-only"></span>
                        </div>
                        <div className="spinner-grow text-info" role="status">
                            <span className="sr-only"></span>
                        </div>
                        <div className="spinner-grow text-light" role="status">
                            <span className="sr-only"></span>
                        </div>
                        <div className="spinner-grow text-dark" role="status">
                            <span className="sr-only"></span>
                        </div>

                    </div>}

            </div>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
    return design;
}
export default Home;