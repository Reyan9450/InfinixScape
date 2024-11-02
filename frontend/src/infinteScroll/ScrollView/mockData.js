// mockData.js

export const mockPosts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    url: `https://via.placeholder.com/600/${Math.floor(Math.random() * 1000) + 100}`,
    title: `Post ${i + 1}`
}));
