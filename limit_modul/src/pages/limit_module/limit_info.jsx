import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

export default function RecipeReviewCard() {
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    // theme.palette.grey[200]
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#f56e29',
      ...theme.applyStyles('dark', {
        backgroundColor: '#308fe8',
      }),
    },
  }));



  return (
    <div style={{ display: 'flex', justifyContent:'center', flexDirection:'column'}}>
      <div>
          <Card sx={{ maxWidth: 800, width:800}} >
                <CardContent style={{hight:'10px', padding:'5px 10px', backgroundColor:'rgb(0,71,200)'}}>
                      <Typography gutterBottom sx={{fontSize: 14,hight:'10px', color:'white'}}>
                        Доступный лимит
                      </Typography>
                </CardContent>
                <CardHeader
                      action={ <div style={{fontSize:'28px'}}>150 000 000Р</div> }
                      title="ГК Цветочек"
                      subheaderTypographyProps={{fontSize:'12px'}}
                      subheader="01.11.2023-05.12.2026"
                />
          </Card>
      </div>
      <div className='div_hight'></div>
      <div>
          <Card sx={{ maxWidth: 800, width:800}} >
                <CardHeader
                    action={
                      <div style={{display:'flex', flexDirection:'column', justifyContent:'right', alignItems:'flex-end'}}>
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-end'}}>
                              <div style={{fontSize:'24px', color:'black'}}>26 000 000 Р</div>
                              <div style={{fontSize:'14px', color:'gray'}}>из 150 000 000 Р</div>
                          </div>
                          <div>
                              <BorderLinearProgress variant="determinate" value={50} style={{width:'300px', display:'flex'}} />
                          </div>
                      </div>
                    }
                    title="Доступно"
                style={{alightItems:'flex-end'}}/>
          </Card>
      </div>
      <div className='div_hight_2'></div>
      <div>
          <Card sx={{ maxWidth: 800, width:800}} >
                <CardContent style={{hight:'10px', padding:'5px 10px', backgroundColor:'rgb(0,71,200)'}}>
                      <Typography gutterBottom sx={{fontSize: 14,hight:'10px', color:'white'}}>
                        Фактическая задолженность
                      </Typography>
                </CardContent>
                <CardHeader
                      action={ <div style={{fontSize:'24px', color:'gray'}}>150 000 000Р</div> }
                      title="ООО Тюльпан"
                      subheaderTypographyProps={{fontSize:'12px'}}
                      subheader="01.11.2023-05.12.2026"
                />
      </Card>
      </div>
      <div className='div_hight'></div>
      <div>
          <Card sx={{ maxWidth: 800, width:800}} >
                <CardHeader
                    action={
                      <div style={{display:'flex', flexDirection:'column', justifyContent:'right', alignItems:'flex-end'}}>
                        <div>
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                              <div style={{fontSize:'16px', color:'black', width: '186px'}}> Кредитные лимиты</div>
                              &emsp;
                              <div style={{paddingTop:'9px'}}><BorderLinearProgress variant="determinate" value={50} style={{width:'150px', display:'flex'}} /></div>
                              &emsp;
                              <div style={{fontSize:'16px', color:'black'}}> 26 000 000 Р </div>
                              <div style={{fontSize:'12px', color:'gray', paddingTop:'4px'}}>&nbsp; из 150 000 000 Р</div>
                          </div>
                      </div>
                      <div>
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                              <div style={{fontSize:'16px', color:'black', width: '186px'}}> Документарные лимиты</div>
                              &emsp;
                              <div style={{paddingTop:'9px'}}><BorderLinearProgress variant="determinate" value={50} style={{width:'150px', display:'flex'}} /></div>
                              &emsp;
                              <div style={{fontSize:'16px', color:'black'}}> 26 000 000 Р </div>
                              <div style={{fontSize:'12px', color:'gray', paddingTop:'4px'}}>&nbsp; из 150 000 000 Р</div>
                          </div>
                      </div>
                      <div>
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                              <div style={{fontSize:'16px', color:'black', width: '186px'}}> Факторинговые лимиты</div>
                              &emsp;
                              <div style={{paddingTop:'9px'}}><BorderLinearProgress variant="determinate" value={50} style={{width:'150px', display:'flex'}} /></div>
                              &emsp;
                              <div style={{fontSize:'16px', color:'black'}}> 26 000 000 Р </div>
                              <div style={{fontSize:'12px', color:'gray', paddingTop:'4px'}}>&nbsp; из 150 000 000 Р</div>
                          </div>
                      </div>
                    </div>

                    }
                    title="Суб-лимиты"
                style={{alightItems:'flex-end'}}/>
          </Card>
      </div>
    </div>
  );
}













// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme }) => ({
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
//   variants: [
//     {
//       props: ({ expand }) => !expand,
//       style: {
//         transform: 'rotate(0deg)',
//       },
//     },
//     {
//       props: ({ expand }) => !!expand,
//       style: {
//         transform: 'rotate(180deg)',
//       },
//     },
//   ],
// }));


// <Card sx={{ maxWidth: 800 }} >
//             <CardContent style={{hight:'10px', padding:'5px 5px', backgroundColor:'rgb(0,71,200)'}}>
//                   <Typography gutterBottom sx={{fontSize: 14,hight:'10px', color:'white'}}>
//                     Доступный лимит
//                   </Typography>
//             </CardContent>
//             <CardHeader
//                   action={
                    
//                     <div style={{fontSize:'28px'}}>
//                         150 000 000Р
//                     </div>
//                   }
//                   title="ООО Ромашка"
//                   subheaderTypographyProps={{fontSize:'12px'}}
//                   subheader="01.11.2023-05.12.2026"
//             />
//             <CardContent>
//                   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                     This impressive paella is a perfect party dish and a fun meal to cook
//                     together with your guests. Add 1 cup of frozen peas along with the mussels,
//                     if you like.
//                   </Typography>
//             </CardContent>
//             <CardActions disableSpacing>
//                   <IconButton aria-label="add to favorites">
//                     <FavoriteIcon />
//                   </IconButton>
//                   <IconButton aria-label="share">
//                     <ShareIcon />
//                   </IconButton>
//                   <ExpandMore
//                     expand={expanded}
//                     onClick={handleExpandClick}
//                     aria-expanded={expanded}
//                     aria-label="show more"
//               >
//                     <ExpandMoreIcon />
//                   </ExpandMore>
//             </CardActions>
//             <Collapse in={expanded} timeout="auto" unmountOnExit>
//               <CardContent>
//                     <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
//                     <Typography sx={{ marginBottom: 2 }}>
//                       Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
//                       aside for 10 minutes.
//                     </Typography>
//                     <Typography sx={{ marginBottom: 2 }}>
//                       Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
//                       medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
//                       occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
//                       large plate and set aside, leaving chicken and chorizo in the pan. Add
//                       pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
//                       stirring often until thickened and fragrant, about 10 minutes. Add
//                       saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
//                     </Typography>
//                     <Typography sx={{ marginBottom: 2 }}>
//                       Add rice and stir very gently to distribute. Top with artichokes and
//                       peppers, and cook without stirring, until most of the liquid is absorbed,
//                       15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
//                       mussels, tucking them down into the rice, and cook again without
//                       stirring, until mussels have opened and rice is just tender, 5 to 7
//                       minutes more. (Discard any mussels that don&apos;t open.)
//                     </Typography>
//                     <Typography>
//                       Set aside off of the heat to let rest for 10 minutes, and then serve.
//                     </Typography>
//               </CardContent>
//             </Collapse>
//           </Card>