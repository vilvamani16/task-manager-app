import {ThreeDots} from 'react-loader-spinner'

import './index.css'

const Loader = () => (
    <div className='loader-container'>
        <ThreeDots height="80" width="80" radius="9" color="#000130" ariaLabel="three-dots-loading" visible={true}/>
    </div>
)

export default Loader