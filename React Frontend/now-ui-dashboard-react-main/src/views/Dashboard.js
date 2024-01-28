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
import axios from "axios";
import React, { useEffect, useState } from "react";
// react plugin used to create charts
import { Radar, Pie, Doughnut, Bubble } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
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
    paddingLeft: "50px",
  };
  const [data, setData] = useState([]);
  const [countsDough, setCountsDough] = useState([]);
  const [labelsDough, setLabelsDough] = useState([]);
  const [countsPie, setCountsPie] = useState([]);
  const [labelsPie, setLabelsPie] = useState([]);
  const [countsRadar, setCountsRadar] = useState([]);
  const [labelsRadar, setLabelsRadar] = useState([]);
  const [piechoice, setPie] = useState("GV");
  const [doughchoice, setDough] = useState("GV");
  const [radarchoice, setradar] = useState("GV");
  const [TTGV, setTTGV] = useState([]);
  const [TTGTa, setTTGTa] = useState([]);
  const [TTGTe, setTTGTe] = useState([]);

  useEffect(() => {
    fetch(url + "Data")
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((res) => {
        setLabelsRadar(Object.keys(res.spendGv));
        setCountsRadar(Object.values(res.spendGv));
        setCountsPie(res.countsGv);
        setLabelsPie(res.labelsGv);
        setData(res);
        setTTGTa(res.totalGTa);
        setTTGTe(res.totalGTe);
        setTTGV(res.totalGV);
        setCountsDough(res.valuesGvG);
        setLabelsDough(res.labelsGvG);
      })
      .catch((e) => console.log(e));
    /* fetch(url + "MoneyDistroPerProd")
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((res) => {
        console.log(res);
        setLabelsRadar(Object.keys(res.spendGv));
        setCountsRadar(Object.values(res.spendGv));
      });

    fetch(url + "SignupsPerUni")
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((res) => {
        setCountsPie(res.countsGv);
        setLabelsPie(res.labelsGv);
        setDataUni(res);
      });

    fetch(url + "totalSignups")
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((res) => {
        setTTGTa(res.totalGTa);
        setTTGTe(res.totalGTe);
        setTTGV(res.totalGV);
      });

    fetch(url + "GendersPerProd")
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((res) => {
        setCountsDough(res.valuesGvG);
        setLabelsDough(res.labelsGvG);
        setDataG(res);
      }); */
  }, []);
  return (
    <>
      <div className="content">
        <br />
        <br />
        <br />
        <h1>Medina IM Dashboard</h1>
        <Row>
          <Col xs={12} md={8}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h2">Number of Sign Ups</CardTitle>
              </CardHeader>
              <CardBody>
                <br />
                <Row style={{ textAlign: "center" }}>
                  <Col md={{ size: 4 }}>
                    <h5 className="card-category">Global Volunteer Sign Ups</h5>
                    <h1>{TTGV}</h1>
                  </Col>
                  <Col md={{ size: 4 }}>
                    <h5 className="card-category">Global Talent Sign Ups</h5>
                    <h1>{TTGTa}</h1>
                  </Col>
                  <Col md={{ size: 4 }}>
                    <h5 className="card-category">Global Teacher Sign Ups</h5>
                    <h1>{TTGTe}</h1>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <br />
                <CardTitle tag="h2" style={{ textAlign: "center" }}>
                  Total Sign Ups
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Col style={{ textAlign: "center", gridRow: "span 2" }}>
                  <br />
                  <h1>{TTGTe + TTGTa + TTGV}</h1>
                  <br />
                </Col>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Sign ups per university</CardTitle>
              </CardHeader>
              <CardBody>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-round btn-outline-default btn-icon"
                    color="default"
                  >
                    {piechoice}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      onClick={() => {
                        setPie("GV");
                        setCountsPie(data.countsGv);
                        setLabelsPie(data.labelsGv);
                      }}
                    >
                      GV
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setPie("GTa");
                        setCountsPie(data.countsGTa);
                        setLabelsPie(data.labelsGTa);
                      }}
                    >
                      GTa
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setPie("GTe");
                        setCountsPie(data.countsGTe);
                        setLabelsPie(data.labelsGTe);
                      }}
                    >
                      GTe
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <div className="chart-area" style={pieChartStyle}>
                  {data.labelsGv ? (
                    <Pie
                      options={options}
                      data={{
                        labels: labelsPie,
                        datasets: [
                          {
                            label: "Number of sign ups",
                            data: countsPie,
                            backgroundColor: [
                              "rgba(230, 57, 70 )",
                              "rgba(255, 159, 64 )",
                              "rgba(255, 205, 86 )",
                              "rgba(98, 166, 87 )",
                              "rgba(54, 162, 235 )",
                              "rgba(156, 99, 212 )",
                              "rgba(220, 118, 51 )",
                              "rgba(0, 184, 148 )",
                              "rgba(102, 204, 153 )",
                              "rgba(232, 126, 4 )",
                              "rgba(237, 201, 81 )",
                              "rgba(82, 186, 182 )",
                              "rgba(158, 123, 199 )",
                              "rgba(80, 170, 255 )",
                              "rgba(235, 77, 75 )",
                              "rgba(255, 144, 86 )",
                              "rgba(111, 187, 98 )",
                              "rgba(87, 117, 144 )",
                            ],
                            borderColor: [
                              "rgba(230, 57, 70, 1)",
                              "rgba(255, 159, 64, 1)",
                              "rgba(255, 205, 86, 1)",
                              "rgba(98, 166, 87, 1)",
                              "rgba(54, 162, 235, 1)",
                              "rgba(156, 99, 212, 1)",
                              "rgba(220, 118, 51, 1)",
                              "rgba(0, 184, 148, 1)",
                              "rgba(102, 204, 153, 1)",
                              "rgba(232, 126, 4, 1)",
                              "rgba(237, 201, 81, 1)",
                              "rgba(82, 186, 182, 1)",
                              "rgba(158, 123, 199, 1)",
                              "rgba(80, 170, 255, 1)",
                              "rgba(235, 77, 75, 1)",
                              "rgba(255, 144, 86, 1)",
                              "rgba(111, 187, 98, 1)",
                              "rgba(87, 117, 144, 1)",
                            ],

                            borderWidth: 1,
                          },
                        ],
                      }}
                    />
                  ) : (
                    <p>No data found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h4">Products by Gender</CardTitle>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-round btn-outline-default btn-icon"
                    color="default"
                  >
                    {doughchoice}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      onClick={() => {
                        setDough("GV");
                        setCountsDough(data.valuesGvG);
                        setLabelsDough(data.labelsGvG);
                      }}
                    >
                      GV
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setDough("GTa");
                        setCountsDough(data.valuesGTaG);
                        setLabelsDough(data.labelsGTaG);
                      }}
                    >
                      GTa
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setDough("GTe");
                        setCountsDough(data.valuesGTeG);
                        setLabelsDough(data.labelsGTeG);
                      }}
                    >
                      GTe
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  <Doughnut
                    options={options}
                    data={{
                      labels: labelsDough,
                      datasets: [
                        {
                          label: "Number of sign ups",
                          data: countsDough,
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
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h4">Spending amount by product</CardTitle>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-round btn-outline-default btn-icon"
                    color="default"
                  >
                    {radarchoice}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      onClick={() => {
                        setradar("GV");
                        setCountsRadar(Object.values(data.spendGv));
                        setLabelsRadar(Object.keys(data.spendGv));
                      }}
                    >
                      GV
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setradar("GTa");
                        setCountsRadar(Object.values(data.spendGta));
                        setLabelsRadar(Object.keys(data.spendGta));
                      }}
                    >
                      GTa
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setradar("GTe");
                        setCountsRadar(Object.values(data.spendGte));
                        setLabelsRadar(Object.keys(data.spendGte));
                      }}
                    >
                      GTe
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  <Doughnut
                    options={options}
                    data={{
                      labels: labelsRadar,
                      datasets: [
                        {
                          label: "Number of sign ups",
                          data: countsRadar,
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
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Email Statistics</h5>
                  <CardTitle tag="h4">24 Hours Performance</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={dashboard24HoursPerformanceChart.data}
                      options={dashboard24HoursPerformanceChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">
                    <i className="now-ui-icons ui-2_time-alarm" /> Last 7 days
                  </div>
                </CardFooter>
              </Card>
            </Col> */}
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
