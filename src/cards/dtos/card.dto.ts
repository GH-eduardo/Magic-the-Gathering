export interface CardDto {
    name: String
    magic_card_id: String
    mana_cost: String
    cmc: Number
    field: String
    oracle_text: String
    power: String
    toughness: String
    color_identity: String[]
    legal_in_commander: boolean | false
    set_name: String
    rarity: String
    is_commander :Boolean | false
}