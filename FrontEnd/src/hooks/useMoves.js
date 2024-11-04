/* import React , { useState, useEffect } from "react";

const useMoves = () => {
    const [moves, setMoves] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchMoves();
    }, []);

    function fetchMoves() {
        setIsLoading(true)
        fetch('/getMoves') 
            .then(response => response.json())
            .then(data => { 
                if (data.moves.length > 0) {
                    setMoves(data.moves);
                };
                setIsLoading(false)
            })
            .catch((error) => alert(error.message))
    }

    return {moves, setMoves, isLoading};
} 

export default useMoves;
*/