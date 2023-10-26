import React from 'react'

export default function Search() {
    return (
        <form class="form-inline d-flex flex-column flex-sm-row gap-1 my-1 justify-content-end">
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" />
                {/* <div class="input-group-append">
                    <span className="input-group-text clear-search" onclick="clearSearch()">&#10006;</span>
                </div> */}
            </div>
            <button type="submit" className="btn btn-primary"><i className="bi bi-search me-1"></i>Search</button>
        </form>
    )
}
