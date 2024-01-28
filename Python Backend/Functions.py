import pandas as pd

abbv = {'Ecole Supérieure de Commerce de Tunis - Université de La Manouba': 'ESC',
        'Institut Supérieur de Comptabilité et d Administration des Entreprises': 'ISCAE',
        'Faculté des Lettres, des Arts et des Humanités-Université la Manouba': 'FLAH',
        'École supérieure des sciences et technologies du design': 'ESSTED',
        'Ecole Supérieure de I Economie Numérique': 'ESEN',
        'Institut Supérieur des Arts Multimédia de la Manouba': 'ISAMM',
        'École Nationale des Sciences de I Informatique': 'ENSI',
        'Institut supérieur de biotechnologie de Sidi Thabet': 'ISBST',
        'Institut de Presse et des Sciences de I information': 'IPSI',
        'Institut supérieur de documentation de Tunis': 'ISD',
        "Institut Supérieur du Sport et de I Education Physique de Ksar Said":"INEPS",
        "Faculté privée des sciences de la santé en Tunisie":"Sup Sat",
        "Université Mahmoud El Materi":"UMM",
        "École nationale de médecine vétérinaire":"ENMV",
        "Institut Supérieur de I Histoire de la Tunisie contemporaine":"ISHTC",
        "Institut Supérieur de I Éducation Spécialisée":"ISES"}

FormResponsesID = '1VDGwldyTr2xWkK13erUyLYln2AEM__jGHVC9QAtxTZc'
SHEET_ID = '1tiblVhgbFFDvTuIG0WXmg-QAnt72pidS7Fjpt8YdDcA'

urlGv = f'https://docs.google.com/spreadsheets/d/{FormResponsesID}/gviz/tq?tqx=out:csv&gid=1399503396'
urlGTe = f'https://docs.google.com/spreadsheets/d/{FormResponsesID}/gviz/tq?tqx=out:csv&gid=1412376203'
urlGTa = f'https://docs.google.com/spreadsheets/d/{FormResponsesID}/gviz/tq?tqx=out:csv&gid=1882702474'
urlODM = f'https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv'


def FetchFromSheetsForm():
    dfGTa = pd.read_csv(urlGTa)
    dfGv = pd.read_csv(urlGv)
    dfGTe = pd.read_csv(urlGTe)
    dfGTa =  dfGTa.drop_duplicates(subset='E-Mail')
    dfGv = dfGv.drop_duplicates(subset='E-Mail')
    dfGTe = dfGTe.drop_duplicates(subset='E-Mail')
    return(dfGTa,dfGv,dfGTe)

def FetchFromSheetsODM():
    df=pd.read_csv(urlODM)
    df=df.rename(columns={df.columns[1]: 'ODI', df.columns[2]: 'HDI',df.columns[5]:"PDI"})
    return df

def SignupsPerUni(df):
    counts = df.groupby('Where do you study?').size()
    labels = []
    values = counts.values.tolist()
    for label in counts.index:
        if label in abbv:
            labels.append(abbv[label])
        else:
            print("Label not found in abbv dictionary:", label)
            labels.append("Unknown")
    return (labels,values)

def GenderCountsPerProd(df):
    counts = df['Gender'].value_counts()
    labels = counts.index.tolist()
    values = counts.values.tolist()
    return (labels,values)