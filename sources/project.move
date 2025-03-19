module MyModule::NFTMusicDistribution {
    use aptos_framework::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::token;

    /// Function to mint an NFT representing a musician's track.
    public fun mint_music_nft(creator: &signer, name: vector<u8>, uri: vector<u8>) {
        token::create_token(
            creator, 
            name, 
            name, 
            1,  // Max supply
            uri, 
            creator, 
            500,  // 5% Royalty
            false, false, false
        );
    }

    /// Function to allow users to purchase the music NFT, transferring royalties.
    public fun purchase_music_nft(buyer: &signer, creator_addr: address, price: u64) {
        let payment = coin::withdraw<AptosCoin>(buyer, price);
        coin::deposit<AptosCoin>(creator_addr, payment);
    }
}
