import React, { useState, useEffect } from 'react'
import { zero_addr } from '../utils'

import { DisplayAssets } from '../page_components';
import { useStateContext } from '../context'


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [assetss, setAsset] = useState([]);

  const { address, contract, fetchAssets } = useStateContext();

  const fetchAllAssets = async () => {
    setIsLoading(true);
    const data = await fetchAssets(zero_addr());
    var others_assets = []
    data.map((asset, index) => {
      if (asset.owner !== address)
        others_assets.push(asset)
    })
    setAsset(others_assets);
    setIsLoading(false);
  }


  useEffect(() => {
    if (contract) {
      fetchAllAssets();
    }
    return () => { };
  }, [address, contract]);


  return (
    <DisplayAssets
      title="All Services and Products"
      isLoading={isLoading}
      assets={assetss}
      from="home"
    />
  );

};

export default Home