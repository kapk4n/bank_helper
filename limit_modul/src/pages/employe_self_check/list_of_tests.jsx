import React, { Component } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../App.css"
import { observer } from 'mobx-react-lite';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, Typography } from "@mui/material";

export const TestListView = observer((testInfo) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();


    const [feedbacks_percentage, setFeedbacksPercentage] = useState([]);
    useEffect(() => {
  
      const fetchArticles = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
  
        setFeedbacksPercentage([]);
        const api_response = axios.get(`http://localhost:8001/api/test/percent/${testInfo['test_id']}`, {
        });
        let data = await api_response;
        setFeedbacksPercentage(data);
      }
      fetchArticles()
      }, [])
  
      const data_percentage = {feedbacks_percentage};

      const [feedbacks_min, setFeedbacksMin] = useState([]);
      useEffect(() => {
    
        const fetchArticles = async () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    
          setFeedbacksMin([]);
          const api_response = axios.get(`http://localhost:8001/api/tasks/mins/${testInfo['test_id']}`, {
          });
          let data = await api_response;
          setFeedbacksMin(data);
        }
        fetchArticles()
        }, [])
    
        const data_min = {feedbacks_min};

      function ar(data){
        if (data != undefined){
          return true
        }
      }

  return (
      <> 
      {
        ar(data_percentage.feedbacks_percentage.data) ? 
            <div style={{paddingBottom:'5px'}}>
              <Card style={{ maxWidth: 1150, width: 1150}} >
                <CardHeader
                    action={
                      <div style={{display:'flex', flexDirection:'column', justifyContent:'right', alignItems:'flex-end'}}>
                        <div>
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                              <div style={{fontSize:'16px', color:'black'}}> Результат:</div>
                              <div style={{fontSize:'16px', color:'gray'}}>&nbsp;
                                {ar(data_percentage.feedbacks_percentage.data['data']) ? 
                                        <>{data_percentage.feedbacks_percentage.data['data'][0]['num']}%</>
                                        : <>Не пройден</>
                              }
                               </div>
                          </div>
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                              <div style={{fontSize:'13px', color:'black'}}> 
                                {
                                ar(data_min.feedbacks_min.data) ? 
                                   <><Button href={`/test/show/results/${data_min.feedbacks_min.data['data'][0]['min']}/${testInfo['test_id']}`}
                                          disabled =  {ar(data_percentage.feedbacks_percentage.data['data']) ? false : true}
                                > Посмотреть результаты</Button>
                                <Button href={`/pass/test/${data_min?.feedbacks_min?.data?.data[0]['min']}/${testInfo['test_id']}`}> {ar(data_percentage.feedbacks_percentage.data['data']) ? <>Перепройти тест</> : <>Пройти тест</>}</Button>
                                </>
                                 : <><Button disabled> Тест не содержит вопросы</Button>
                                </>
                                }

                                <Button href={`/test/create/${testInfo['test_id']}`}>Изменить тест</Button>
                              </div>
                          </div>
                      </div>
                    </div>
                    }
                    title={testInfo['test_title']}
                />
            </Card>              
          </div>
      : null
      }
      
    </>

  )

});

export default TestListView;
