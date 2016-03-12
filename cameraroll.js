'use strict';

import React, {
	CameraRoll,
} from 'react-native';


const fetchParams = {
	first: 20,
}

storeImages(data) {
	const assets = data.edges;
	const images = assets.map( asset => asset.node.image );
	this.setState({
		images: images,
	});
}