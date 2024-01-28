import React, { useEffect, useState } from "react";
// react plugin used to create charts
import { Line } from "react-chartjs-2";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

// core components

function ODModel() {
  const url2 = "http://127.0.0.1:8000/";
  const url = "https://im_fastapi-1-e2418416.deta.app/";
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        intersect: false,
      },
    },
    scales: {
      yAxis: {
        min: 0,
        beginAtZero: true,
        ticks: {
          stepSize: 0.05,
        },
      },
    },
  };

  const pieChartStyle = {
    width: "95%",
    height: "70%",
    paddingLeft: "50px",
  };

  const [countsODI, setCountsODI] = useState([]);
  const [labelsODI, setLabelsODI] = useState();
  const [countsHDI, setCountsHDI] = useState([]);
  const [countsPDI, setCountsPDI] = useState([]);
  const [countsMKT, setCountsMKT] = useState([]);
  const [countsOGTA, setCountsOGTA] = useState([]);
  const [countsOGTE, setCountsOGTE] = useState([]);
  const [countsOGV, setCountsOGV] = useState([]);
  const [countsIGTA, setCountsIGTA] = useState([]);
  const [countsIGTE, setCountsIGTE] = useState([]);
  const [countsIGV, setCountsIGV] = useState([]);
  const [countsMXP, setCountsMXP] = useState([]);
  const [countsFNL, setCountsFNL] = useState([]);
  const [countsBD, setCountsBD] = useState([]);
  const [currentCluster, setCurrentCluster] = useState("Downgraded");
  const [currentCColor, setCColor] = useState("#1a3438");

  const clusterStyle = {
    backgroundColor: currentCColor,
    color: "white",
    textAlign: "center",
    width: "50%",
    marginLeft: "25%",
    padding: "10px",
    borderRadius: "2px",
  };

  useEffect(() => {
    fetch(url + "ODM")
      .then((response) => response.json())
      .then((res) => {
        setLabelsODI(Object.keys(res));
        let odi = [];
        let hdi = [];
        let pdi = [];
        let mkt = [];
        let ogta = [];
        let ogte = [];
        let ogv = [];
        let igv = [];
        let igta = [];
        let igte = [];
        let mxp = [];
        let fnl = [];
        let bd = [];
        Object.values(res).forEach((e) => {
          odi.push(e.ODI);
          hdi.push(e.HDI);
          pdi.push(e.PDI);
          ogta.push(e["oGTa\nPDI"]);
          ogte.push(e["oGTe\nPDI"]);
          ogv.push(e["oGV\nPDI"]);
          mkt.push(e["MKT PDI"]);
          igta.push(e["iGTa\nPDI"]);
          igte.push(e["iGTe\nPDI"]);
          igv.push(e["iGV PDI"]);
          mxp.push(e["MXP PDI"]);
          fnl.push(e["Finance Index"]);
          bd.push(e["BD Index"]);
        });
        setCountsODI(odi);
        setCountsHDI(hdi);
        setCountsPDI(pdi);
        setCountsMKT(mkt);
        setCountsOGV(ogv);
        setCountsOGTE(ogte);
        setCountsOGTA(ogta);
        setCountsIGTA(igta);
        setCountsIGTE(igte);
        setCountsIGV(igv);
        setCountsMXP(mxp);
        setCountsBD(bd);
        setCountsFNL(fnl);
        let lastOdi = odi[odi.length - 1];
        let lastHdi = hdi[hdi.length - 1];
        if (lastOdi <= 0.3) {
          setCurrentCluster("Beginner");
          setCColor("#ee5a53");
        } else if (lastOdi >= 0.4 && lastHdi >= 0.35) {
          setCurrentCluster("Startup");
          setCColor("#f3941e");
        } else if (lastOdi >= 0.5 && lastHdi >= 0.5) {
          setCurrentCluster("Healthy");
          setCColor("#0a8ea0");
        } else if (lastOdi >= 0.6 && lastHdi >= 0.6) {
          setCurrentCluster("Developed");
          setCColor("#63bd87");
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="content">
        <br />
        <br />
        <br />
        <h1>Medina OD Model (2023)</h1>
        <Row>
          <Col xs={12} md={12}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h1">Current LC Cluster</CardTitle>
              </CardHeader>
              <CardBody style={{ alignContent: "center" }}>
                <h2 style={clusterStyle}>{currentCluster}</h2>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">ODI</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  {labelsODI ? (
                    <Line
                      options={options}
                      data={{
                        labels: labelsODI,
                        datasets: [
                          {
                            data: countsODI,
                            backgroundColor: [
                              "rgba(255, 99, 132,0.6)",
                              "rgba(54, 162, 235,0.6)",
                              "rgba(255, 206, 86,0.6)",
                              "rgba(75, 192, 192,0.6)",
                              "rgba(153, 102, 255,0.6)",
                              "rgba(255, 159, 64,0.6)",
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
                    <p>No data found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">HDI</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  {labelsODI ? (
                    <Line
                      options={options}
                      data={{
                        labels: labelsODI,
                        datasets: [
                          {
                            data: countsHDI,
                            backgroundColor: [
                              "rgba(255, 99, 132,0.6)",
                              "rgba(54, 162, 235,0.6)",
                              "rgba(255, 206, 86,0.6)",
                              "rgba(75, 192, 192,0.6)",
                              "rgba(153, 102, 255,0.6)",
                              "rgba(255, 159, 64,0.6)",
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
                    <p>No data found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">PDI</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  {labelsODI ? (
                    <Line
                      options={options}
                      data={{
                        labels: labelsODI,
                        datasets: [
                          {
                            data: countsPDI,
                            backgroundColor: [
                              "rgba(255, 99, 132,0.6)",
                              "rgba(54, 162, 235,0.6)",
                              "rgba(255, 206, 86,0.6)",
                              "rgba(75, 192, 192,0.6)",
                              "rgba(153, 102, 255,0.6)",
                              "rgba(255, 159, 64,0.6)",
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
                    <p>No data found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">MKT PDI</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  {labelsODI ? (
                    <Line
                      options={options}
                      data={{
                        labels: labelsODI,
                        datasets: [
                          {
                            data: countsMKT,
                            backgroundColor: [
                              "rgba(255, 99, 132,0.6)",
                              "rgba(54, 162, 235,0.6)",
                              "rgba(255, 206, 86,0.6)",
                              "rgba(75, 192, 192,0.6)",
                              "rgba(153, 102, 255,0.6)",
                              "rgba(255, 159, 64,0.6)",
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
                    <p>No data found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">OGTa PDI</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  {labelsODI ? (
                    <Line
                      options={options}
                      data={{
                        labels: labelsODI,
                        datasets: [
                          {
                            data: countsOGTA,
                            backgroundColor: [
                              "rgba(255, 99, 132,0.6)",
                              "rgba(54, 162, 235,0.6)",
                              "rgba(255, 206, 86,0.6)",
                              "rgba(75, 192, 192,0.6)",
                              "rgba(153, 102, 255,0.6)",
                              "rgba(255, 159, 64,0.6)",
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
                    <p>No data found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">OGTe PDI</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  {labelsODI ? (
                    <Line
                      options={options}
                      data={{
                        labels: labelsODI,
                        datasets: [
                          {
                            data: countsOGTE,
                            backgroundColor: [
                              "rgba(255, 99, 132,0.6)",
                              "rgba(54, 162, 235,0.6)",
                              "rgba(255, 206, 86,0.6)",
                              "rgba(75, 192, 192,0.6)",
                              "rgba(153, 102, 255,0.6)",
                              "rgba(255, 159, 64,0.6)",
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
                    <p>No data found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">OGv PDI</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  {labelsODI ? (
                    <Line
                      options={options}
                      data={{
                        labels: labelsODI,
                        datasets: [
                          {
                            data: countsOGV,
                            backgroundColor: [
                              "rgba(255, 99, 132,0.6)",
                              "rgba(54, 162, 235,0.6)",
                              "rgba(255, 206, 86,0.6)",
                              "rgba(75, 192, 192,0.6)",
                              "rgba(153, 102, 255,0.6)",
                              "rgba(255, 159, 64,0.6)",
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
                    <p>No data found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">IGTe PDI</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  {labelsODI ? (
                    <Line
                      options={options}
                      data={{
                        labels: labelsODI,
                        datasets: [
                          {
                            data: countsIGTE,
                            backgroundColor: [
                              "rgba(255, 99, 132,0.6)",
                              "rgba(54, 162, 235,0.6)",
                              "rgba(255, 206, 86,0.6)",
                              "rgba(75, 192, 192,0.6)",
                              "rgba(153, 102, 255,0.6)",
                              "rgba(255, 159, 64,0.6)",
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
                    <p>No data found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">IGTa PDI</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  {labelsODI ? (
                    <Line
                      options={options}
                      data={{
                        labels: labelsODI,
                        datasets: [
                          {
                            data: countsIGTA,
                            backgroundColor: [
                              "rgba(255, 99, 132,0.6)",
                              "rgba(54, 162, 235,0.6)",
                              "rgba(255, 206, 86,0.6)",
                              "rgba(75, 192, 192,0.6)",
                              "rgba(153, 102, 255,0.6)",
                              "rgba(255, 159, 64,0.6)",
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
                    <p>No data found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">IGv PDI</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  {labelsODI ? (
                    <Line
                      options={options}
                      data={{
                        labels: labelsODI,
                        datasets: [
                          {
                            data: countsIGV,
                            backgroundColor: [
                              "rgba(255, 99, 132,0.6)",
                              "rgba(54, 162, 235,0.6)",
                              "rgba(255, 206, 86,0.6)",
                              "rgba(75, 192, 192,0.6)",
                              "rgba(153, 102, 255,0.6)",
                              "rgba(255, 159, 64,0.6)",
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
                    <p>No data found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">MXP PDI</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  {labelsODI ? (
                    <Line
                      options={options}
                      data={{
                        labels: labelsODI,
                        datasets: [
                          {
                            data: countsMXP,
                            backgroundColor: [
                              "rgba(255, 99, 132,0.6)",
                              "rgba(54, 162, 235,0.6)",
                              "rgba(255, 206, 86,0.6)",
                              "rgba(75, 192, 192,0.6)",
                              "rgba(153, 102, 255,0.6)",
                              "rgba(255, 159, 64,0.6)",
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
                    <p>No data found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">BD Index</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  {labelsODI ? (
                    <Line
                      options={options}
                      data={{
                        labels: labelsODI,
                        datasets: [
                          {
                            data: countsBD,
                            backgroundColor: [
                              "rgba(255, 99, 132,0.6)",
                              "rgba(54, 162, 235,0.6)",
                              "rgba(255, 206, 86,0.6)",
                              "rgba(75, 192, 192,0.6)",
                              "rgba(153, 102, 255,0.6)",
                              "rgba(255, 159, 64,0.6)",
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
                    <p>No data found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Finance Index</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={pieChartStyle}>
                  {labelsODI ? (
                    <Line
                      options={options}
                      data={{
                        labels: labelsODI,
                        datasets: [
                          {
                            data: countsFNL,
                            backgroundColor: [
                              "rgba(255, 99, 132,0.6)",
                              "rgba(54, 162, 235,0.6)",
                              "rgba(255, 206, 86,0.6)",
                              "rgba(75, 192, 192,0.6)",
                              "rgba(153, 102, 255,0.6)",
                              "rgba(255, 159, 64,0.6)",
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
                    <p>No data found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ODModel;
