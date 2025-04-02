const features = [
    'Up to 20k monthly sessions',
    'Session Replay and unlimited heatmaps',
    'Frustration score and advanced filtering',
    'More than 115 integrations',
    'Impact Quantification',
    '13 months of data access'
]


const table = [
    {
        name: 'Free',
        desc: 'Every feature we offer plus unlimited contacts, unlimited pipelines and powerful automations.',
        prices: ['price_1R3iUSJEDKLFQJCTkgLdd30j'],
        product: 'prod_KyysQmyZNpoN95',
        costs: ['0.00'],
        credit: 30,
        features
    },
    {
        name: 'Silver',
        desc: 'Every feature we offer plus unlimited contacts, unlimited pipelines and powerful automations.',
        prices: ['price_1Oa2hWJEDKLFQJCTjCXtixJK'],
        product: 'prod_POqOy53hUyM42p',
        costs: ['8.99'],
        features
    },
    { 
        name: 'Platinum', 
        desc: 'Every feature we offer plus unlimited contacts, unlimited pipelines and powerful automations.',
        prices: ['price_1Q0kouJEDKLFQJCTBHU5XL7n', 'price_1R4LshJEDKLFQJCTnzCNwfVe'],
        product: 'prod_PqrJtAnZXoGVBm',
        costs: ['12.99', '10.99'],
        features
    },
  
 
]


const purchaseOptions = {
    diy: { title: `Purchase—$199`, link: `https://buy.stripe.com/00g8wx86p9x5aIg3ch` },
    dev: { title: `Purchase—$299`, link: `https://buy.stripe.com/5kA5klaex6kT03C8ww` }
  }




export { table, purchaseOptions }