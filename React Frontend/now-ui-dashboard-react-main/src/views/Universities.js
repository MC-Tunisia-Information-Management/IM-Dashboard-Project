/*!

=========================================================
* Now UI Dashboard React - v1.5.1
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
// react plugin used to create charts
import { Pie, Doughnut } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// core components

function Dashboard() {
  const url2 = "http://127.0.0.1:8000/";
  const url = "https://im_fastapi-1-e2418416.deta.app/";
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed}`;
          },
        },
      },
    },
  };
  const pieChartStyle = {
    width: "300px",
    height: "300px",
    paddingLeft: "30px",
  };
  const [data, setData] = useState([]);
  const [prod, setProd] = useState("GV");
  const [uniabbv, setUniAbbv] = useState("ESC");
  const [uni, setUni] = useState(
    "Ecole Supérieure de Commerce de Tunis - Université de La Manouba"
  );
  const [abbvs, setAbbvs] = useState([]);
  const [countsDoughGv, setCountsDoughGv] = useState([]);
  const [labelsDoughGv, setLabelsDoughGv] = useState([]);
  const [countsPieGv, setCountsPieGv] = useState([]);
  const [labelsPieGv, setLabelsPieGv] = useState([]);
  const [countsDoughGTa, setCountsDoughGTa] = useState([]);
  const [labelsDoughGTa, setLabelsDoughGTa] = useState([]);
  const [countsPieGTa, setCountsPieGTa] = useState([]);
  const [labelsPieGTa, setLabelsPieGTa] = useState([]);
  const [countsDoughGTe, setCountsDoughGTe] = useState([]);
  const [labelsDoughGTe, setLabelsDoughGTe] = useState([]);
  const [countsPieGTe, setCountsPieGTe] = useState([]);
  const [labelsPieGTe, setLabelsPieGTe] = useState([]);
  const [countsUniGv, setCountsUniGv] = useState(0);
  const [countsUniGTe, setCountsUniGTe] = useState(0);
  const [countsUniGTa, setCountsUniGTa] = useState(0);

  useEffect(() => {
    fetch(url + "Universities/" + uniabbv)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setAbbvs(res.abbv);
        setData(res.data);
        setCountsUniGv(res.totaluniGv);
        setCountsUniGTe(res.totaluniGTe);
        setCountsUniGTa(res.totaluniGTa);
        setLabelsDoughGv(Object.keys(res.data["gender_countsGv"]));
        setCountsDoughGv(Object.values(res.data["gender_countsGv"]));
        setLabelsPieGv(Object.keys(res.data["spending_countsGv"]));
        setCountsPieGv(Object.values(res.data["spending_countsGv"]));
        setLabelsDoughGTe(Object.keys(res.data["gender_countsGTe"]));
        setCountsDoughGTe(Object.values(res.data["gender_countsGTe"]));
        setLabelsPieGTe(Object.keys(res.data["spending_countsGTe"]));
        setCountsPieGTe(Object.values(res.data["spending_countsGTe"]));
        setLabelsDoughGTa(Object.keys(res.data["gender_countsGTa"]));
        setCountsDoughGTa(Object.values(res.data["gender_countsGTa"]));
        setLabelsPieGTa(Object.keys(res.data["spending_countsGTa"]));
        setCountsPieGTa(Object.values(res.data["spending_countsGTa"]));
      });
  }, [prod, uniabbv, uni]);

  return (
    <>
      <div className="content">
        <br />
        <br />
        <h1>Medina IM Dashboard</h1>
        <Row>
          <Col xs={12} md={12}>
            <Card className="card-chart">
              <CardHeader style={{ padding: "0px", marginBottom: "10px" }}>
                <Row>
                  <Col
                    md={6}
                    xs={12}
                    style={{ paddingTop: "15px", marginLeft: "20px" }}
                  >
                    <h1>Charts per university</h1>
                  </Col>
                  <Col xs={{ offset: 9, size: 2 }} md={{ offset: 3, size: 2 }}>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        className="btn-outline-default btn-icon"
                        color="default"
                        style={{ width: "70px" }}
                      >
                        {uniabbv}
                      </DropdownToggle>
                      <DropdownMenu
                        right
                        style={{
                          width: "70px",
                          maxHeight: "230px",
                          overflowY: "auto",
                        }}
                      >
                        {Object.entries(abbvs).map(([name, abb]) => (
                          <DropdownItem
                            key={abb}
                            onClick={() => {
                              setUniAbbv(abb);
                              setUni(name);
                            }}
                          >
                            {abb}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                  <br />
                  <br />
                  <br />
                  <Col xs={12} md={12}>
                    <h2 style={{ textAlign: "center" }}>{uni}</h2>
                  </Col>
                  <Col
                    xs={12}
                    md={{ offset: 3, size: 6 }}
                    style={{ textAlign: "center" }}
                  >
                    <br />
                    <div
                      style={{
                        margin: "10px",
                        backgroundColor: "#037ef3",
                        borderRadius: "10px",
                        color: "white",
                        padding: "15px 0px 5px 0px",
                      }}
                    >
                      <h2>
                        Total signups
                        <br />
                        {countsUniGTa + countsUniGTe + countsUniGv}
                      </h2>
                      <Card
                        className="card-chart"
                        style={{ textAlign: "center" }}
                      >
                        <CardHeader
                          tag="h4"
                          style={{
                            color: "black",
                            marginTop: "0px",
                            paddingTop: "5px",
                          }}
                        >
                          Sign up distribution
                        </CardHeader>
                        <Col
                          md={{ offset: 3, size: 2 }}
                          xs={{ offset: 1, size: 2 }}
                        >
                          <div
                            className="chart-area"
                            style={{
                              width: "250px",
                              height: "250px",
                              paddingLeft: "30px",
                            }}
                          >
                            {labelsPieGv.length != 0 ? (
                              <Pie
                                options={options}
                                data={{
                                  labels: ["Gv", "GTa", "GTe"],
                                  datasets: [
                                    {
                                      label: "Number of sign ups",
                                      data: [
                                        countsUniGv,
                                        countsUniGTa,
                                        countsUniGTe,
                                      ],
                                      backgroundColor: [
                                        "rgba(255, 99, 132)",
                                        "rgba(54, 162, 235)",
                                        "rgba(255, 206, 86)",
                                        "rgba(75, 192, 192)",
                                        "rgba(153, 102, 255)",
                                        "rgba(255, 159, 64)",
                                      ],
                                      borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                        "rgba(54, 162, 235, 1)",
                                        "rgba(255, 206, 86, 1)",
                                        "rgba(75, 192, 192, 1)",
                                        "rgba(153, 102, 255, 1)",
                                        "rgba(255, 159, 64, 1)",
                                      ],
                                      borderWidth: 1,
                                    },
                                  ],
                                }}
                              />
                            ) : (
                              <h2>No data found</h2>
                            )}
                          </div>
                        </Col>
                      </Card>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <div
                  style={{
                    backgroundColor: "#f85a40",
                    padding: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <CardHeader
                    style={{
                      marginBottom: "10px",
                      fontSize: "55px",
                      textAlign: "center",
                      backgroundColor: "#f85a40",
                      color: "white",
                    }}
                  >
                    Global Volunteer
                  </CardHeader>
                  <Row>
                    <Col md={4}>
                      <Card
                        className="card-chart"
                        style={{ textAlign: "center" }}
                      >
                        <CardHeader
                          tag="h4"
                          style={{
                            marginTop: "0px",
                            paddingTop: "5px",
                          }}
                        >
                          Gender distribution
                        </CardHeader>
                        <CardBody>
                          <div className="chart-area" style={pieChartStyle}>
                            {labelsDoughGv.length != 0 ? (
                              <Doughnut
                                options={options}
                                data={{
                                  labels: labelsDoughGv,
                                  datasets: [
                                    {
                                      label: "Number of sign ups",
                                      data: countsDoughGv,
                                      backgroundColor: [
                                        "rgba(255, 99, 132)",
                                        "rgba(54, 162, 235)",
                                        "rgba(255, 206, 86)",
                                        "rgba(75, 192, 192)",
                                        "rgba(153, 102, 255)",
                                        "rgba(255, 159, 64)",
                                      ],
                                      borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                        "rgba(54, 162, 235, 1)",
                                        "rgba(255, 206, 86, 1)",
                                        "rgba(75, 192, 192, 1)",
                                        "rgba(153, 102, 255, 1)",
                                        "rgba(255, 159, 64, 1)",
                                      ],
                                      borderWidth: 1,
                                    },
                                  ],
                                }}
                              />
                            ) : (
                              <h2>No data found</h2>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card
                        className="card-chart"
                        style={{ textAlign: "center" }}
                      >
                        <CardHeader
                          tag="h4"
                          style={{
                            marginTop: "0px",
                            paddingTop: "5px",
                          }}
                        >
                          Money distribution
                        </CardHeader>
                        <CardBody>
                          <div className="chart-area" style={pieChartStyle}>
                            {labelsPieGv.length != 0 ? (
                              <Pie
                                options={options}
                                data={{
                                  labels: labelsPieGv,
                                  datasets: [
                                    {
                                      label: "Number of sign ups",
                                      data: countsPieGv,
                                      backgroundColor: [
                                        "rgba(255, 99, 132)",
                                        "rgba(54, 162, 235)",
                                        "rgba(255, 206, 86)",
                                        "rgba(75, 192, 192)",
                                        "rgba(153, 102, 255)",
                                        "rgba(255, 159, 64)",
                                      ],
                                      borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                        "rgba(54, 162, 235, 1)",
                                        "rgba(255, 206, 86, 1)",
                                        "rgba(75, 192, 192, 1)",
                                        "rgba(153, 102, 255, 1)",
                                        "rgba(255, 159, 64, 1)",
                                      ],
                                      borderWidth: 1,
                                    },
                                  ],
                                }}
                              />
                            ) : (
                              <h2>No data found</h2>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card
                        className="card-chart"
                        style={{ textAlign: "center" }}
                      >
                        <CardHeader
                          tag="h4"
                          style={{
                            marginTop: "0px",
                            paddingTop: "5px",
                          }}
                        >
                          Total signups GV
                          <br />
                          <br />
                        </CardHeader>
                        <CardBody style={{ height: "290px" }}>
                          <h1 style={{ marginTop: "20%", fontSize: "100px" }}>
                            {countsUniGv}
                          </h1>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
                <div
                  style={{
                    backgroundColor: "#0cb9c1",
                    padding: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <CardHeader
                    style={{
                      marginBottom: "10px",
                      fontSize: "60px",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Global Talent
                  </CardHeader>
                  <Row>
                    <Col md={4}>
                      <Card
                        className="card-chart"
                        style={{ textAlign: "center" }}
                      >
                        <CardHeader
                          tag="h4"
                          style={{
                            marginTop: "0px",
                            paddingTop: "5px",
                          }}
                        >
                          Gender distribution
                        </CardHeader>
                        <CardBody>
                          <div className="chart-area" style={pieChartStyle}>
                            {labelsDoughGTa.length != 0 ? (
                              <Doughnut
                                options={options}
                                data={{
                                  labels: labelsDoughGTa,
                                  datasets: [
                                    {
                                      label: "Number of sign ups",
                                      data: countsDoughGTa,
                                      backgroundColor: [
                                        "rgba(255, 99, 132)",
                                        "rgba(54, 162, 235)",
                                        "rgba(255, 206, 86)",
                                        "rgba(75, 192, 192)",
                                        "rgba(153, 102, 255)",
                                        "rgba(255, 159, 64)",
                                      ],
                                      borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                        "rgba(54, 162, 235, 1)",
                                        "rgba(255, 206, 86, 1)",
                                        "rgba(75, 192, 192, 1)",
                                        "rgba(153, 102, 255, 1)",
                                        "rgba(255, 159, 64, 1)",
                                      ],
                                      borderWidth: 1,
                                    },
                                  ],
                                }}
                              />
                            ) : (
                              <h2>No data found</h2>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card
                        className="card-chart"
                        style={{ textAlign: "center" }}
                      >
                        <CardHeader
                          tag="h4"
                          style={{
                            marginTop: "0px",
                            paddingTop: "5px",
                          }}
                        >
                          Money distribution
                        </CardHeader>
                        <CardBody>
                          <div className="chart-area" style={pieChartStyle}>
                            {labelsPieGTa.length != 0 ? (
                              <Pie
                                options={options}
                                data={{
                                  labels: labelsPieGTa,
                                  datasets: [
                                    {
                                      label: "Number of sign ups",
                                      data: countsPieGTa,
                                      backgroundColor: [
                                        "rgba(255, 99, 132)",
                                        "rgba(54, 162, 235)",
                                        "rgba(255, 206, 86)",
                                        "rgba(75, 192, 192)",
                                        "rgba(153, 102, 255)",
                                        "rgba(255, 159, 64)",
                                      ],
                                      borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                        "rgba(54, 162, 235, 1)",
                                        "rgba(255, 206, 86, 1)",
                                        "rgba(75, 192, 192, 1)",
                                        "rgba(153, 102, 255, 1)",
                                        "rgba(255, 159, 64, 1)",
                                      ],
                                      borderWidth: 1,
                                    },
                                  ],
                                }}
                              />
                            ) : (
                              <h2>No data found</h2>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card
                        className="card-chart"
                        style={{ textAlign: "center" }}
                      >
                        <CardHeader
                          tag="h4"
                          style={{
                            marginTop: "0px",
                            paddingTop: "5px",
                          }}
                        >
                          Total signups GTa
                          <br />
                          <br />
                        </CardHeader>
                        <CardBody style={{ height: "290px" }}>
                          <h1 style={{ marginTop: "20%", fontSize: "100px" }}>
                            {countsUniGTa}
                          </h1>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
                <div
                  style={{
                    backgroundColor: "#f48924",
                    padding: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <CardHeader
                    style={{
                      marginBottom: "10px",
                      fontSize: "60px",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Global Teacher
                  </CardHeader>
                  <Row>
                    <Col md={4}>
                      <Card
                        className="card-chart"
                        style={{ textAlign: "center" }}
                      >
                        <CardHeader
                          tag="h4"
                          style={{
                            marginTop: "0px",
                            paddingTop: "5px",
                          }}
                        >
                          Gender distribution
                        </CardHeader>
                        <CardBody>
                          <div className="chart-area" style={pieChartStyle}>
                            {labelsDoughGTe.length != 0 ? (
                              <Doughnut
                                options={options}
                                data={{
                                  labels: labelsDoughGTe,
                                  datasets: [
                                    {
                                      label: "Number of sign ups",
                                      data: countsDoughGTe,
                                      backgroundColor: [
                                        "rgba(255, 99, 132)",
                                        "rgba(54, 162, 235)",
                                        "rgba(255, 206, 86)",
                                        "rgba(75, 192, 192)",
                                        "rgba(153, 102, 255)",
                                        "rgba(255, 159, 64)",
                                      ],
                                      borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                        "rgba(54, 162, 235, 1)",
                                        "rgba(255, 206, 86, 1)",
                                        "rgba(75, 192, 192, 1)",
                                        "rgba(153, 102, 255, 1)",
                                        "rgba(255, 159, 64, 1)",
                                      ],
                                      borderWidth: 1,
                                    },
                                  ],
                                }}
                              />
                            ) : (
                              <h2>No data found</h2>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card
                        className="card-chart"
                        style={{ textAlign: "center" }}
                      >
                        <CardHeader
                          tag="h4"
                          style={{
                            marginTop: "0px",
                            paddingTop: "5px",
                          }}
                        >
                          Money distribution
                        </CardHeader>
                        <CardBody>
                          <div className="chart-area" style={pieChartStyle}>
                            {labelsPieGTe.length != 0 ? (
                              <Pie
                                options={options}
                                data={{
                                  labels: labelsPieGTe,
                                  datasets: [
                                    {
                                      label: "Number of sign ups",
                                      data: countsPieGTe,
                                      backgroundColor: [
                                        "rgba(255, 99, 132)",
                                        "rgba(54, 162, 235)",
                                        "rgba(255, 206, 86)",
                                        "rgba(75, 192, 192)",
                                        "rgba(153, 102, 255)",
                                        "rgba(255, 159, 64)",
                                      ],
                                      borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                        "rgba(54, 162, 235, 1)",
                                        "rgba(255, 206, 86, 1)",
                                        "rgba(75, 192, 192, 1)",
                                        "rgba(153, 102, 255, 1)",
                                        "rgba(255, 159, 64, 1)",
                                      ],
                                      borderWidth: 1,
                                    },
                                  ],
                                }}
                              />
                            ) : (
                              <h2>No data found</h2>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card
                        className="card-chart"
                        style={{ textAlign: "center" }}
                      >
                        <CardHeader
                          tag="h4"
                          style={{
                            marginTop: "0px",
                            paddingTop: "5px",
                          }}
                        >
                          Total signups GTe
                          <br />
                          <br />
                        </CardHeader>
                        <CardBody style={{ height: "290px" }}>
                          <h1 style={{ marginTop: "20%", fontSize: "100px" }}>
                            {countsUniGTe}
                          </h1>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
