const Loading = () => (
    <div className="container">
        <div className="roll">
            <div className="roll-container container1">
                <div className="item1"></div>
                <div className="item2"></div>
                <div className="item3"></div>
                <div className="item4"></div>
            </div>
            <div className="roll-container container2">
                <div className="item1"></div>
                <div className="item2"></div>
                <div className="item3"></div>
                <div className="item4"></div>
            </div>
        </div>
        <style>{`
            .roll {
                width: 20px;
                height: 20px;
                position: absolute;
                right:-250%;
            }
            .roll>div {
                width: 100%;
                height: 100%;
                position: absolute;
            }
            .container2 {
               transform: rotateZ(45deg);
            }
            .roll-container>div {
                width: 6px;
                height: 6px;
                background: #ffc107;
                border-radius: 100%;
                position: absolute;
                animation: roll 1.2s infinite;
            }
            .item1 {
                left: 0;
                top: 0;
            }
            .item2 {
                right: 0;
                top: 0;
            }
            .item3 {
                right: 0;
                bottom: 0;
            }
            .item4 {
                left: 0;
                bottom: 0;
            }
            @keyframes roll {
                0%,100% {
                   transform: scale(0);
                }
                50% {
                   transform: scale(1.0);
                }
            }
            .container1 .item2 {
               animation-delay: -0.9s;
            }
            .container1 .item3 {
               animation-delay: -0.6s;
            }   
            .container1 .item4 {
               animation-delay: -0.3s;
            }
            .container2 .item1 {
               animation-delay: -1.1s;
            }
            .container2 .item2 {
               animation-delay: -0.8s;
            }
            .container2 .item3 {
               animation-delay: -0.5s;
            }   
            .container2 .item4 {
               animation-delay: -0.2s;
            }
        `}</style>
    </div>
)
export default Loading;