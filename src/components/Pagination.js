import React, { Component } from 'react';

class Pagination extends Component {
    render() {

        const { postsPerPage , totalPosts, paginate , nextPage , prevPage} = this.props;
        const pageNumbers = [];

        for (let i=1 ; i<= Math.ceil(totalPosts/postsPerPage); i++){

            pageNumbers.push(i);
        }
        return (
            <nav>
                <ul className = "pagination justify-content-center ">
                    <li className="page-item">
                        <a onClick={() => prevPage()} className="page-link" >Previous</a>

                    </li>

                    {pageNumbers.map(num  => {
 
 return                     <li className="page-item">
                <a onClick={() => paginate(num)} className="page-link"  >{num}</a> 
                </li>;

                       
                    })

                    }
                   

                    <li className="page-item">
                        <a onClick={() => nextPage()} className="page-link" >Next</a>

                    </li>
                </ul>
            </nav>
        );
    }
}

export default Pagination;