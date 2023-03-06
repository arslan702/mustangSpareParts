import React from 'react'
import './hot.module.css';
import Slider from '../Slider/Slider'
import { hotProducts } from '../Slider/data';

export default function Hot() {
    return (
        <>
        <div>
<div>
    
</div>
        </div>
           <Slider title='Hot Products' products={hotProducts}/> 
           </>
    )
}
