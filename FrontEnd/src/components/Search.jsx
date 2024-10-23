import React, { useState } from "react";

// Example data (replace this with your data source)
const items = [
    { id: 1, name: "Inception" },
    { id: 2, name: "Interstellar" },
    { id: 3, name: "The Dark Knight" },
    { id: 4, name: "Memento" },
    { id: 5, name: "Tenet" }
];

function SearchComponent(props) {
    const [query, setQuery] = useState("");

    // Filter items based on the search query
    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div hidden={props.hidden} style={styles.wrapper}>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={props.placeholder}
                    style={styles.searchInput}
                />

                {query && (
                    <ul style={styles.searchResults}>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <li key={item.id} style={styles.listItem}>
                                    {item.name}
                                </li>
                            ))
                        ) : (
                            <li style={styles.noResult}>No results found</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

// Styles for better visual appearance
const styles = {
    wrapper: {
        position: "relative",
        width: "60%",
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
    },
    searchContainer: {
        position: "relative",
        zIndex: 2, // Ensures search input and results appear above the Move component
    },
    searchInput: {
        width: "100%",
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        fontSize: "16px",
        marginBottom: "10px",
    },
    searchResults: {
        position: "absolute",
        width: "100%",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        maxHeight: "200px",
        overflowY: "auto",
        listStyle: "none",
        padding: 0,
        margin: 0,
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        zIndex: 3, // Ensure the search results overlay the Move component
    },
    listItem: {
        padding: "10px",
        borderBottom: "1px solid #eee",
        cursor: "pointer",
        backgroundColor: "#fff",
    },
    noResult: {
        padding: "10px",
        color: "#999",
        backgroundColor: "#fff",
    },
    moveContainer: {
        marginTop: "20px",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#f0f0f0",
        zIndex: 1,
    },
    moveTitle: {
        fontSize: "24px",
        marginBottom: "10px",
        color: "#333",
    },
};

export default SearchComponent;
