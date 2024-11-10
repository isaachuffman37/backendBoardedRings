document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Fetch data from your server
      const response = await fetch('http://localhost:8080/rings'); // Update with actual endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const rings = await response.json();
  
      // Select the unordered list
      const ringsList = document.querySelector('.rings-list');
  
      // Iterate over each ring and create list items
      rings.forEach(ring => {
        const listItem = document.createElement('li');
  
        // Customize the list item content
        listItem.innerHTML = `
          <h3>${ring.Name}</h3>
          <p><strong>Description:</strong> ${ring.description}</p>
          <p><strong>Width:</strong> ${ring.width}</p>
          <p><strong>Price:</strong> $${ring.price}</p>
          <p><strong>Colors:</strong> ${ring.colors.join(', ')}</p>
          <p><strong>Sizes:</strong> ${ring.sizes.join(', ')}</p>
        `;
  
        // Append the list item to the unordered list
        ringsList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching ring data:', error);
    }
  });