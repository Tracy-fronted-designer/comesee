import React, { Component } from 'react';

import IS from '../../css/home/infoPage.module.css';

class StoryTabs extends Component {

    state = {}

    render() {
        return (
            <>
                <article className={IS.text}>
                    { }
                    《復仇狗聯盟》《蟻人與黃蜂女：量子狂熱》製作團隊最新作品，首週動畫新片票房冠軍，神秘的冰雪魔法世界，只有學習鼓起勇氣與團結一致，才能拯救被冰封的世界…在鏡之國的一座冰雪城堡中，冰雪女王警告女兒艾拉神祕封印下的厚厚冰層內，住著邪惡的冰雪妖魔們。三名可愛的山精旅行家意外來到冰雪城堡探險，鮮少有朋友的艾拉看到他們非常開心，忘情地決定帶他們到神祕封印遊覽，卻意外打開了封印，釋放出的邪惡冰雪妖魔們不僅擾亂鏡之國，甚至人類世界。冰雪女王要求艾拉和山精們一起前往人類世界尋找冒險家凱和格爾達，只有他們能幫助對付冰雪妖魔。凱和格爾達住在一個舒適安靜的小鎮，發現突然間小鎮上的人們都被凍結。找到凱和格爾達的艾拉一行人，出發尋找擊敗精靈們的方法。一路上遇到了許多冒險，最後意外拯救了仙女艾麗達後獲贈了魔法靈丹。大家回到鏡之國合力對付這些冰雪妖魔們，並且使用靈丹的力量，艾拉、女王和大家並肩作戰，究竟他們能否擊敗這些來自北方的冰雪妖魔，解除鏡之國和人類世界的危機呢？今年夏天，這些小小英雄們將學習如何鼓起勇氣並團結一致，奮力拯救兩個世界。....(本資訊由開眼電影提供)
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