import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Account from "../pages/home/Account";
import Houses from "../pages/home/Houses";
import HouseItemPage from "../pages/home/HouseItemPage";
import HouseForm from "../components/house/HouseForm";
import Payments from "../pages/home/Payments";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Account">
                <Account/>
            </ComponentPreview>
            <ComponentPreview path="/Houses">
                <Houses/>
            </ComponentPreview>
            <ComponentPreview path="/HouseItemPage">
                <HouseItemPage/>
            </ComponentPreview>
            <ComponentPreview path="/HouseForm">
                <HouseForm/>
            </ComponentPreview>
            <ComponentPreview path="/Payments">
                <Payments/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews