document.getElementById("generate-btn").addEventListener("click", generateUUIDs);
document.getElementById("download-btn").addEventListener("click", downloadUUIDs);

async function generateUUIDs() {
    const count = document.getElementById("uuid-count").value;
    const version = document.getElementById("uuid-version").value;
    const apiUrl = `https://www.uuidtools.com/api/generate/${version}/count/${count}`;

    if (count < 1 || count > 100) {
        alert("Please enter a number between 1 and 100.");
        return;
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch UUIDs.");
        const uuids = await response.json();

        displayUUIDs(uuids);
    } catch (error) {
        alert("Error generating UUIDs. Please try again.");
        console.error(error);
    }
}

function displayUUIDs(uuids) {
    const listContainer = document.getElementById("uuid-list");
    listContainer.innerHTML = "";
    uuids.forEach(uuid => {
        const div = document.createElement("div");
        div.textContent = uuid;
        listContainer.appendChild(div);
    });
}

function downloadUUIDs() {
    const listContainer = document.getElementById("uuid-list");
    if (listContainer.children.length === 0) {
        alert("No UUIDs to download. Generate some first.");
        return;
    }

    let textContent = "";
    listContainer.childNodes.forEach(node => {
        textContent += node.textContent + "\n";
    });

    const blob = new Blob([textContent], {
        type: "text/plain"
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "uuids.txt";
    link.click();
}