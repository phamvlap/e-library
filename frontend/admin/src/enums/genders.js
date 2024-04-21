class Gender {
    static genders = {
        MALE: 'Nam',
        FEMALE: 'Nữ',
        OTHER: 'Khác',
    };
    static getKeys() {
        return Object.keys(this.genders);
    }
    static retreiveGender(key) {
        return this.genders[key];
    }
}

export default Gender;
