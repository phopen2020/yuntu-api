import Link from 'next/link';
import IconFont from './IconFont';
const Header = () => {
    const bgColor = "#202020";
    const fontColor = "#fff";
    return (
        <div className="container">
            <header>
                <div className="header-left">
                    <Link href="/home">
                        <a className="logo-area">
                            <img src="https://cloudconvert.com/images/logo_flat_110_borderless.png" />
                            <h1>云转换</h1>
                        </a>
                    </Link>
                </div>
                <div className="header-right">
                    <nav>
                        <ul className="nav">
                            <li className="nav-items">工具类<IconFont type="icon-xiala" style={{fontSize: 15, marginLeft: '3px'}}/></li>
                            <li className="nav-items" ><Link href="/api"><a>API</a></Link></li>
                            <li className="nav-items" ><Link href="/price"><a>价钱</a></Link></li>
                            <li className="nav-items">新闻</li>
                        </ul>
                    </nav>
                    <ul className="login-area">
                        <li className="login-items">注册</li>
                        <li className="login-items">登录</li>
                    </ul>
                </div>
            </header>
            <style jsx>{`
                .container{
                    width:100%;
                    min-height:4.75rem;
                    background:${bgColor};
                    color:${fontColor};
                    background-image: linear-gradient(45deg,${bgColor},#3a3a3a);
                    background-repeat: repeat-x;
                    line-height: 1;
                }
                header{
                    display:flex;
                    justify-content:space-between;
                    aligh-items:center;
                    width:1140px;
                    margin:0 auto;
                    padding:0 15px;
                    box-sizing: border-box;
                }
                header .header-left{
                    width:13rem;
                    padding:0 15px;
                }
                header .header-left .logo-area{
                    display:flex;
                    padding:21px 0;
                }
                header .header-left .logo-area img{
                    width:3.7rem;
                    height:2.28rem;
                }
                header .header-left .logo-area h1{
                    font-size:1.6rem;
                    line-height:2.28rem;
                    padding:0 0 0 10px;
                    color: #fff;
                    margin:0;
                }
                header .header-right{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    width:64rem;
                    padding:0 18px;
                }
                header .header-right nav .nav{
                    display:flex;
                    align-items:center;
                    list-style: none;
                    margin-bottom: 0;
                }
                header .header-right nav .nav .nav-items{
                    padding:27px 12px;
                    font-size:15px;
                    font-weight:600;
                    cursor:pointer;
                }
                header .header-right nav .nav .nav-items a{
                    color: #fff;
                }
                header .header-right .login-area{
                    display:flex;
                    align-items:center;
                    list-style: none;
                    margin-bottom: 0;
                }
                header .header-right .login-area .login-items{
                    padding:27px 12px;
                    font-size:15px;
                    font-weight:600;
                }
            `}</style>
        </div>
    );
}
export default Header;