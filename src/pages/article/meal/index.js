import React from 'react';
import CommonArticle from '../commonArticle';

export default class ClassArticle extends React.Component {
    render(){
        return (<div>
                <CommonArticle type='meal' />
        </div>)
    }
}