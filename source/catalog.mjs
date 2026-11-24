export const categories = [
  { id: 'Carry', label: 'Carry', description: 'Wallets, card holders and bags for the daily rotation.', image: 'carry' },
  { id: 'Wear', label: 'Wear', description: 'Frames, a field watch and a belt that work across the week.', image: 'wear' },
  { id: 'Travel', label: 'Travel', description: 'A place for the small things that come along.', image: 'travel' },
  { id: 'Gift', label: 'Gifts', description: 'A useful pairing for someone who travels light.', image: 'gift' },
];

export const products = [
  {
    id: 'card-holder', name: 'Atelier Card Holder', category: 'Carry', price: 2490, color: 'Espresso',
    summary: 'A slim leather sleeve for four cards and the occasional folded note.',
    material: 'Vegetable-tanned leather', size: '100 × 68 mm', details: 'Four card slots and a central pocket',
    care: 'Wipe with a soft, dry cloth and allow the leather to air-dry if it gets damp.',
  },
  {
    id: 'meridian-wallet', name: 'Meridian Wallet', category: 'Carry', price: 3490, color: 'Espresso',
    summary: 'A compact leather bifold for six cards and folded notes. The stitched edges and slim profile make it easy to carry in a front pocket.',
    material: 'Vegetable-tanned leather', size: '105 × 75 mm', details: 'Six card slots and space for folded notes',
    care: 'Wipe with a soft, dry cloth. Store away from direct heat and prolonged moisture.', editorial: 'carry',
  },
  {
    id: 'no-07-sunglasses', name: 'No. 07 Sunglasses', category: 'Wear', price: 4990, color: 'Black',
    summary: 'A soft-square acetate frame with smoke-coloured lenses and a little more weight at the brow.',
    material: 'Acetate frame and CR-39 lenses', size: '52–19–145 mm', details: 'Protective case included',
    care: 'Use a clean microfibre cloth and store the frame in its case between wears.', editorial: 'wear',
  },
  {
    id: 'form-travel-case', name: 'Form Travel Case', category: 'Travel', price: 3990, color: 'Khaki',
    summary: 'A structured zip case that keeps a passport, cables and loose essentials together when you move between bags.',
    material: 'Waxed canvas with leather trim', size: '220 × 120 × 55 mm', details: 'Compartments for a passport, cables and small items',
    care: 'Brush off dry dirt and clean marks with a damp cloth. Allow to air-dry.', editorial: 'travel',
  },
  {
    id: 'axis-watch', name: 'Axis Field Watch', category: 'Wear', price: 7290, color: 'Charcoal',
    summary: 'A charcoal dial, brushed steel case and brown leather strap. The 38 mm case keeps the proportions compact.',
    material: 'Brushed steel and leather', size: '38 mm case', details: 'Charcoal dial with a brown leather strap',
    care: 'Wipe the case with a soft cloth and keep the leather strap dry.',
  },
  {
    id: 'chapter-tote', name: 'Chapter Tote', category: 'Carry', price: 6490, color: 'Natural',
    summary: 'A structured cotton canvas tote with leather handles and enough room for a 13-inch laptop and the day’s essentials.',
    material: 'Cotton canvas and leather handles', size: '410 × 320 × 110 mm', details: 'Fits a 13-inch laptop',
    care: 'Spot-clean canvas with a damp cloth and leave it to air-dry.',
  },
  {
    id: 'weekend-set', name: 'Weekend Carry Set', category: 'Gift', price: 6990, color: 'Espresso / Khaki',
    summary: 'The Meridian Wallet and Form Travel Case in one set. A practical gift for someone who spends their weekends on the move.',
    material: 'Vegetable-tanned leather and waxed canvas', size: 'Wallet 105 × 75 mm · Case 220 × 120 × 55 mm',
    details: 'One Meridian Wallet and one Form Travel Case', care: 'See the care notes on the individual product pages.', editorial: 'gift',
  },
  {
    id: 'belt-01', name: 'No. 01 Belt', category: 'Wear', price: 3190, color: 'Espresso',
    summary: 'A full-grain leather belt with a low-profile brushed buckle and a clean, 35 mm-wide strap.',
    material: 'Full-grain leather', size: '35 mm strap width', details: 'Adjustable punched fit',
    care: 'Wipe with a dry cloth and hang or roll loosely for storage.',
  },
];

export const articles = [
  {
    id: 'everyday-carry', category: 'Everyday carry', title: 'The Art of Everyday Carry',
    summary: 'A practical way to decide what earns a place in your pocket or bag.',
    image: 'travel', product: 'form-travel-case',
    sections: [
      ['Empty the bag first', 'Lay out everything you carried yesterday. Keep the things you used and anything you’d genuinely need if the day changed. Move the rest to a drawer for a week. You’ll know what to bring back by what you reach for.'],
      ['Give small things a fixed place', 'Put keys where your hand finds them first. Keep tickets, a charging cable and loose adapters together. A small pouch makes it easier to transfer the same kit from your work bag to a weekend tote.'],
      ['Pack for the day ahead', 'Check the destination, weather and time you’ll be out. Add what that specific day needs. A bag you can pack in a minute is usually one you’ve edited well.'],
    ],
  },
  {
    id: 'minimalist-wallet', category: 'Buying guide', title: 'How to Choose a Minimalist Wallet',
    summary: 'Start with the cards you use, then choose the shape and construction that suit how you carry them.',
    image: 'carry', product: 'meridian-wallet',
    sections: [
      ['Count your regular rotation', 'Take out the cards you use in a normal week. Four cards and a folded note fit a slim sleeve. If you carry extra cards or use cash regularly, a compact bifold gives you more room.'],
      ['Check the pocket you use', 'Depth matters as much as width. Measure the pocket or compartment where the wallet will live, and remember that a loaded wallet is thicker than an empty one.'],
      ['Look at the edges', 'Inspect the stitching, folds and corners where your fingers handle the wallet most. Keep leather dry and out of direct heat, and give the slots time to settle around the cards you use.'],
    ],
  },
  {
    id: 'essentials', category: 'Perspective', title: 'Five Essentials for a More Considered Everyday',
    summary: 'A short checklist for building a practical collection of things you reach for often.',
    image: 'wear', product: 'no-07-sunglasses',
    sections: [
      ['A wallet and a pair of frames', 'Choose a wallet for your regular cards and a frame that sits comfortably on your nose and behind your ears. Keep the sunglasses case somewhere easy to reach when you take them off.'],
      ['A tote and an organiser', 'Check that the tote fits the largest item you routinely carry, such as a laptop. Keep loose items in a smaller case you can lift out together when you change bags.'],
      ['A belt that works with your wardrobe', 'Try it with the trousers you wear most. Check the width of their belt loops and measure a belt you already own from the buckle to the hole you use.'],
    ],
  },
];
