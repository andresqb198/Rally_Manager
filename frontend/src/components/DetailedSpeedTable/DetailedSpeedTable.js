import React from 'react'
import {columns } from './columns'
import Materialtable from 'material-table'
import {TablePagination,Grid,Typography,Divider} from '@material-ui/core'
import {updateMapCenter} from '../../utils/maptools'
import {HHMMSSToHours,hoursToHHMMSS} from '../../utils/timetools'
import {IconButton} from '@material-ui/core'
import ZoomInIcon from '@material-ui/icons/ZoomIn';

function  DetailedSpeedTable({data,map})
{

  const getTotalPenalizationSpeed = () =>{
    var sum = 0;
    
    data.forEach((point)=>{
       
         sum += HHMMSSToHours(point.penalization)
    })
    
    return hoursToHHMMSS(sum)
}
    return (<Materialtable
        
        columns = {columns}
        data = {data}
        title = 'Speed points'
        options = {{
            tableLayout:'fixed',
            search:false,
            sorting:false,
            
        }}

        actions={[
           {
             icon: 'save',
             tooltip: 'Show in map',
             onClick: (event, rowData) =>{
               updateMapCenter(map,rowData)
             } 
           }
         ]}

        components = {{
            Pagination:(props) => (<div>
               <Grid container style = {{padding:15, background:"#f5f5f5"}}>
                   <Grid item sm={6} align='center'><Typography variant="subtitle2">Total</Typography></Grid>
                   <Grid item sm={6} align='center'><Typography variant="subtitle2">{(data.length>0)?"+"+getTotalPenalizationSpeed():0}</Typography></Grid>
               </Grid>
               <Divider></Divider>
               <TablePagination {...props}/>
            </div>),
            Action: props => (
               <IconButton
                 onClick={(event) => props.action.onClick(event, props.data)}
                 variant="contained"
                 style={{color: '#000'}}
                         
                 size="small"
               >
                <ZoomInIcon fontSize="large" />
                 </IconButton>
           )
        }}

        >

        </Materialtable>)
}

export default DetailedSpeedTable