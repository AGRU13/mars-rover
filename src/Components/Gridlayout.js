import React,{useState} from 'react';
import './Gridlayout.scss';
import StartIcon from './../assets/StartIcon.svg';
import EndIcon from './../assets/EndIcon.svg';

const GridLayout=()=>{
    const list=[];
    const [Start,setStart]=useState([7,5]);
    const [End,setEnd]=useState([7,25]);
    for(let i=0;i<15;i++){
        let temp=[];
        for(let j=0;j<30;j++){
            if(i===Start[0]&&j===Start[1]){
                temp.push(
                    <div className="grid-cells">
                        <img className="grid-cells__img" src={StartIcon} alt="->"/>
                    </div>
                )
            }else if(i===End[0]&&j===End[1]){
                temp.push(
                    <div className="grid-cells">
                        <img className="grid-cells__img" src={EndIcon} alt="x"/>
                    </div>
                )
            }else{
                temp.push(
                    <div className="grid-cells">
                    </div>
                )
            }
        }
        list.push(temp);
    }

    return (
        <div style={{marginTop: "10px"}}>
            {list.map( (obj,idx)=>{
                    return (
                        <div className="grid-rows">
                            {obj}
                        </div>
                    );
                })}
        </div>
    );
}

export default GridLayout