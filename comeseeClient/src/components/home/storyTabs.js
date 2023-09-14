import React, { Component } from 'react';

import IS from '../../css/home/infoPage.module.css';

class StoryTabs extends Component {

    state = {}

    render() {
        return (
            <>
                <article className={IS.text}>
                    {this.props.story}
                </article>
                <div className={IS.videobox}>
                    <iframe
                        src="https://www.youtube-nocookie.com/embed/wzbT8cB554I?si=dfdXc4tzHZ2ht8le"
                        allowFullScreen="true"
                        title="Youtube Video Description"
                        className={IS.video}
                    />
                </div>
            </>
        );
    }
}

export default StoryTabs;