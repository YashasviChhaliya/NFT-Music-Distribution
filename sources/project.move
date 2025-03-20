module 0x21916cf9302024cbae851a488a01d621066181aca7a4110f532c22b99b6f60b5::MusicNFT {

    use aptos_framework::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use std::vector;

    // Define NFT structure
    struct MusicNFT has store, key {
        id: u64,
        artist: address,
        price: u64,
    }

    // Define a resource to store NFTs owned by a user
    struct NFTCollection has key, store {
        nfts: vector<MusicNFT>,
    }

    // Initialize collection when user first mints an NFT
    public fun init_collection(account: &signer) {
        let collection = NFTCollection { nfts: vector::empty<MusicNFT>() };
        move_to(account, collection);
    }

    // Mint NFT and add to user’s collection
    public fun mint_nft(owner: &signer, id: u64, price: u64) {
        let nft = MusicNFT { id, artist: signer::address_of(owner), price };

        // Check if user already has a collection
        if (!exists<NFTCollection>(signer::address_of(owner))) {
            init_collection(owner);
        }

        // Get the collection and add NFT
        let collection = borrow_global_mut<NFTCollection>(signer::address_of(owner));
        vector::push_back(&mut collection.nfts, nft);
    }

    // Buy NFT from another user
    public fun buy_nft(buyer: &signer, seller: address, nft_id: u64, amount: u64) acquires NFTCollection {
        let seller_collection = borrow_global_mut<NFTCollection>(seller);
        let buyer_address = signer::address_of(buyer);

        // Find the NFT in seller's collection
        let index = 0;
        let nft_to_buy = vector::borrow_mut(seller_collection.nfts, index);

        assert!(amount >= nft_to_buy.price, 1); // Ensure correct price

        // Transfer funds
        let payment = coin::withdraw<AptosCoin>(buyer, amount);
        coin::deposit<AptosCoin>(seller, payment);

        // Remove NFT from seller and add to buyer
        let bought_nft = vector::remove(seller_collection.nfts, index);
        
        if (!exists<NFTCollection>(buyer_address)) {
            init_collection(buyer);
        }

        let buyer_collection = borrow_global_mut<NFTCollection>(buyer_address);
        vector::push_back(&mut buyer_collection.nfts, bought_nft);
    }
}
