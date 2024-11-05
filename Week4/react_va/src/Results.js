import React from 'react';

class Results extends React.Component {

    render = () => {

        const query = this.props.state.query;
        const loading = this.props.state.loading;
        const records = this.props.state.records;

        if(query.length === 0) {
            return <div></div>;
        } else if (loading) {
            return (<div id="loading">
                        <img src="loading.gif" alt="loading icon" />
                    </div>);
        } else if(records.length === 0) {
            return (<div id="empty">
                        No results found for "{query}"
                    </div>);
        } else {

            const resultItems = records.map((item, index) => {

                const imageURL = (item._images
                    && item._images._primary_thumbnail
                    ? item._images._primary_thumbnail
                    : 'no_image.png');
                const title = (item._primaryTitle
                    && item._primaryTitle.length > 0
                    ? item._primaryTitle
                    : 'Untitled');
                const maker = (item._primaryMaker
                    && item._primaryMaker.name
                    && item._primaryMaker.name.length > 0
                    ? item._primaryMaker.name
                    : 'Unknown');
                const date = (item._primaryDate
                    && item._primaryDate.length > 0
                    ? item._primaryDate
                    : 'Unknown');

                return (
                    <div key={index.toString()} className="item">
                        <div className="item-image">
                            <img src={imageURL} alt={title} />
                        </div>
                        <div className="item-info">
                            <p>Title: {title}</p>
                            <p>Maker: {maker}</p>
                            <p>Date: {date}</p>
                        </div>
                    </div>
                );
            });

            return <div>{resultItems}</div>;
        
        }
    }
}
export default Results;