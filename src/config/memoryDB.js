const memoryDb = {
    properties: [],
    counter: 0,
    
    // Generate unique ID
    generateId() {
        this.counter += 1;
        return this.counter.toString();
    },
    
    // Find all properties
    findAll() {
        return [...this.properties];
    },
    
    // Find by ID
    findById(id) {
        return this.properties.find(p => p.id === id);
    },
    
    // Create new property
    create(data) {
        const property = {
            id: this.generateId(),
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.properties.push(property);
        return property;
    },
    
    // Update property
    update(id, data) {
        const index = this.properties.findIndex(p => p.id === id);
        if (index === -1) return null;
        
        const updated = {
            ...this.properties[index],
            ...data,
            id, // Ensure ID doesn't change
            updatedAt: new Date()
        };
        this.properties[index] = updated;
        return updated;
    },
    
    // Delete property
    delete(id) {
        const index = this.properties.findIndex(p => p.id === id);
        if (index === -1) return null;
        
        const deleted = this.properties[index];
        this.properties.splice(index, 1);
        return deleted;
    }
};

module.exports = memoryDb;
