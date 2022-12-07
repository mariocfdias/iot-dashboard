import type { NextPage } from 'next'
import Image from 'next/image'
import { AdminLayout } from '@layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
  faDownload,
  faEllipsisVertical,
  faMars,
  faSearch,
  faUsers,
  faVenus,
} from '@fortawesome/free-solid-svg-icons'
import {
  Button, ButtonGroup, Card, Dropdown, ProgressBar,
} from 'react-bootstrap'
import { Bar, Line } from 'react-chartjs-2'
import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import {
  faCcAmex,
  faCcApplePay,
  faCcPaypal,
  faCcStripe,
  faCcVisa,
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import React, { useEffect, useState } from 'react'

import { initializeApp } from 'firebase/app'
import {
  getDatabase, ref, child, get,
} from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAS5j_Y883FS83Lj2UXxql0mTdTVJiqW9o',
  authDomain: 'iot-ufc-firebasepoc.firebaseapp.com',
  databaseURL: 'https://iot-ufc-firebasepoc-default-rtdb.firebaseio.com',
  projectId: 'iot-ufc-firebasepoc',
  storageBucket: 'iot-ufc-firebasepoc.appspot.com',
  messagingSenderId: '901018027526',
  appId: '1:901018027526:web:7b20c0d615a0b2966de587',
}

const app = initializeApp(firebaseConfig)

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

const Home: NextPage = () => {
  const [solarData, setSolarData] = useState([])
  useEffect(() => {
    console.log('teste')

    const dbRef = ref(getDatabase())
    get(child(dbRef, 'painel')).then((snapshot) => {
      if (snapshot.exists()) {
        const res = snapshot.exportVal().teste
        console.log(res)
        console.log(Object.values(res))
        setSolarData(Object.values(res))
      } else {
        console.log('No data available')
      }
    }).catch((error) => {
      console.error(error)
    })
  }, [])
  return (
    <AdminLayout>
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <Card bg="primary" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  - -
                  <span className="fs-6 ms-2 fw-normal" />
                </div>
                <div>Irradiancia Solar</div>
              </div>

            </Card.Body>
            <div className="mt-3 mx-3" style={{ height: '70px' }}>
              <Line
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: 30,
                      max: 89,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                      tension: 0.4,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [65, 59, 84, 84, 51, 55, 40],
                  }],
                }}
              />
            </div>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="info" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  - -
                  <span className="fs-6 ms-2 fw-normal" />
                </div>
                <div>Produção Diaria</div>
              </div>

            </Card.Body>
            <div className="mt-3 mx-3" style={{ height: '70px' }}>
              <Line
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: -9,
                      max: 39,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [1, 18, 9, 17, 34, 22, 11],
                  }],
                }}
              />
            </div>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="warning" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  - -
                  <span className="fs-6 ms-2 fw-normal" />
                </div>
                <div>Produção Mensal Estimada</div>
              </div>

            </Card.Body>
            <div className="mt-3 mx-3" style={{ height: '70px' }}>
              <Line
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 2,
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  }],
                }}
              />
            </div>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="danger" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  1
                  <span className="fs-6 ms-2 fw-normal" />
                </div>
                <div>Numero de Paineis</div>
              </div>

            </Card.Body>
            <div className="mt-3 mx-3" style={{ height: '70px' }}>
              <Bar
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                        drawBorder: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                }}
                data={{
                  datasets: [{
                    label: 'Painel Solar 1',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                    barPercentage: 0.6,
                  }],
                }}
              />
            </div>
          </Card>
        </div>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="mb-0">Leitura - Painel Solar</h4>
              <div className="small text-black-50">Dezembro - 2022</div>
            </div>
            <div className="d-none d-md-block">
              <ButtonGroup aria-label="Toolbar with buttons" className="mx-3">
                <input
                  className="btn-check"
                  id="option1"
                  type="radio"
                  name="options"
                  autoComplete="off"
                />
                <label className="btn btn-outline-secondary" htmlFor="option1">Dia</label>
                <input
                  className="btn-check"
                  id="option2"
                  type="radio"
                  name="options"
                  autoComplete="off"
                  defaultChecked
                />
                <label
                  className="btn btn-outline-secondary active"
                  htmlFor="option2"
                >
                  Mes
                </label>
                <input
                  className="btn-check"
                  id="option3"
                  type="radio"
                  name="options"
                  autoComplete="off"
                />
                <label className="btn btn-outline-secondary" htmlFor="option3">Ano</label>
              </ButtonGroup>

            </div>
          </div>
          <div
            style={{
              height: '300px',
              marginTop: '40px',
            }}
          >
            <Line
              data={{
                labels: ['01/12', '02/12', '03/12', '04/12', '05/12', '06/12', '07/12'],
                datasets: [{
                  label: 'Painel Solar 1',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderColor: 'rgba(13, 202, 240, 1)',
                  pointHoverBackgroundColor: '#fff',
                  borderWidth: 2,
                  data: [
                    solarData[25] || random(50, 200),
                    solarData[26] || random(50, 200),
                    solarData[27] || random(50, 200),
                    solarData[28] || random(50, 200),
                    solarData[29] || random(50, 200),
                    solarData[30] || random(50, 200),
                    solarData[31] || random(50, 200),
                  ],
                  fill: true,
                }],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    max: 250,
                    ticks: {
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
              }}
            />
          </div>
        </Card.Body>

      </Card>

      <div className="row">
        <div className="col-md-12" />
      </div>
    </AdminLayout>
  )
}

export default Home
