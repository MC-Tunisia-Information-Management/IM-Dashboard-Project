from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import pandas as pd
import Functions
app = FastAPI()
PFEResponsesID = '1i-UuFU0Tnt8uCvDCJrInLMYQQK4VG8fdUex17U3gS50'
FormResponsesID = '1VDGwldyTr2xWkK13erUyLYln2AEM__jGHVC9QAtxTZc'

urlGv = f'https://docs.google.com/spreadsheets/d/{FormResponsesID}/gviz/tq?tqx=out:csv&gid=1399503396'
urlGTe = f'https://docs.google.com/spreadsheets/d/{FormResponsesID}/gviz/tq?tqx=out:csv&gid=1412376203'
urlGTa = f'https://docs.google.com/spreadsheets/d/{FormResponsesID}/gviz/tq?tqx=out:csv&gid=1882702474'

urlGvPFE = f'https://docs.google.com/spreadsheets/d/{PFEResponsesID}/gviz/tq?tqx=out:csv&gid=42351524'
urlGTePFE = f'https://docs.google.com/spreadsheets/d/{PFEResponsesID}/gviz/tq?tqx=out:csv&gid=761619868'
urlGTaPFE = f'https://docs.google.com/spreadsheets/d/{PFEResponsesID}/gviz/tq?tqx=out:csv&gid=149314656'

origins = ["*"]
translations = {'Nom et Prénom': 'Full Name',
                'Adresse email': 'E-Mail',
                'Ou étudies-tu?': 'Where do you study?',
                'Quelle est votre classe et votre spécialité ?': 'What\'s your class & specialty?',
                'Quel est ton numéro Whatsapp ?': 'Whatsapp number',
                'Combien êtes-vous prêt à dépenser pour partir à l\'étranger ?': 'How much are you willing to spend for going abroad?',
                'Have you ever heard of AIESEC before?': 'Have you ever heard of AIESEC before?'
                }

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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
        "Institut Supérieur du Sport et de I Education Physique de Ksar Said": "INEPS",
        "Faculté privée des sciences de la santé en Tunisie": "Sup Sat",
        "Université Mahmoud El Materi": "UMM",
        "École nationale de médecine vétérinaire": "ENMV",
        "Institut Supérieur de I Histoire de la Tunisie contemporaine": "ISHTC",
        "Institut Supérieur de I Éducation Spécialisée": "ISES"}


@app.get("/Data")
def read_data():
    (dfGTa, dfGv, dfGTe) = Functions.FetchFromSheetsForm()

    dfGTaPFE = pd.read_csv(urlGTaPFE)
    dfGvPFE = pd.read_csv(urlGvPFE)
    dfGTePFE = pd.read_csv(urlGTePFE)

    dfGTaPFE_updated = dfGTaPFE.rename(columns=translations)

    dfGvPFE_updated = dfGvPFE.rename(columns=translations)

    dfGTePFE_updated = dfGTePFE.rename(columns=translations)

    dfGTa = pd.concat([dfGTa, dfGTaPFE_updated], ignore_index=True)
    dfGv = pd.concat([dfGv, dfGvPFE_updated], ignore_index=True)
    dfGTe = pd.concat([dfGTe, dfGTePFE_updated], ignore_index=True)

    (labelsGv, valuesGv) = Functions.SignupsPerUni(dfGv)
    (labelsGTa, valuesGTa) = Functions.SignupsPerUni(dfGTa)
    (labelsGTe, valuesGTe) = Functions.SignupsPerUni(dfGTe)

    (labelsGvG, valuesGvG) = Functions.GenderCountsPerProd(dfGv)
    (labelsGTaG, valuesGTaG) = Functions.GenderCountsPerProd(dfGTa)
    (labelsGTeG, valuesGTeG) = Functions.GenderCountsPerProd(dfGTe)

    spending_countsGta = dfGTa['How much are you willing to spend for going abroad?'].value_counts(
    ).to_dict()
    spending_countsGv = dfGv['How much are you willing to spend for going abroad?'].value_counts(
    ).to_dict()
    spending_countsGte = dfGTe['How much are you willing to spend for going abroad?'].value_counts(
    ).to_dict()

    json_data = {
        'totalGTe': len(dfGTe),
        'totalGV': len(dfGv),
        'totalGTa': len(dfGTa),
        'spendGv': spending_countsGv,
        'spendGta': spending_countsGta,
        'spendGte': spending_countsGte,
        'labelsGv': labelsGv,
        'countsGv': valuesGv,
        'labelsGTa': labelsGTa,
        'countsGTa': valuesGTa,
        'labelsGTe': labelsGTe,
        'countsGTe': valuesGTe,
        'labelsGvG': labelsGvG,
        'valuesGvG': valuesGvG,
        'labelsGTaG': labelsGTaG,
        'valuesGTaG': valuesGTaG,
        'labelsGTeG': labelsGTeG,
        'valuesGTeG': valuesGTeG,
    }
    return json_data


@app.get("/Universities/{uni}")
async def read_unis(uni: str):
    dfGTa = pd.read_csv(urlGTa)
    dfGTaPFE = pd.read_csv(urlGTaPFE)
    dfGTaPFE_updated = dfGTaPFE.rename(columns=translations)
    dfGTaPFE_updated = dfGTaPFE_updated[dfGTaPFE_updated[
        "Êtes-vous intéressé à partir à l'étranger pour un stage avec l'AIESEC"] == "oui"]
    dfGTa = pd.concat([dfGTa, dfGTaPFE_updated], ignore_index=True)

    dfGv = pd.read_csv(urlGv)
    dfGvPFE = pd.read_csv(urlGvPFE)
    dfGTvPFE_updated = dfGvPFE.rename(columns=translations)
    dfGTvPFE_updated[dfGTvPFE_updated[
        "Êtes-vous intéressé à partir à l'étranger pour un stage avec l'AIESEC"] == "oui"]
    dfGv = pd.concat([dfGv, dfGTvPFE_updated], ignore_index=True)

    dfGTe = pd.read_csv(urlGTe)
    dfGTePFE = pd.read_csv(urlGTePFE)
    dfGTePFE_updated = dfGTePFE.rename(columns=translations)
    dfGTePFE_updated[dfGTePFE_updated[
        "Êtes-vous intéressé à partir à l'étranger pour un stage avec l'AIESEC"] == "oui"]
    dfGTe = pd.concat([dfGTe, dfGTePFE_updated], ignore_index=True)

    full_name = list(abbv.keys())[list(abbv.values()).index(uni)]

    if full_name is None:
        return {"error": "Invalid university abbreviation"}
    filtered_dfGTa = dfGTa[dfGTa['Where do you study?'] == full_name]
    filtered_dfGTe = dfGTe[dfGTe['Where do you study?'] == full_name]
    filtered_dfGv = dfGv[dfGv['Where do you study?'] == full_name]

    gender_countsGTa = filtered_dfGTa['Gender'].value_counts().to_dict()
    spending_countsGTa = filtered_dfGTa['How much are you willing to spend for going abroad?'].value_counts(
    ).to_dict()

    gender_countsGTe = filtered_dfGTe['Gender'].value_counts().to_dict()
    spending_countsGTe = filtered_dfGTe['How much are you willing to spend for going abroad?'].value_counts(
    ).to_dict()

    gender_countsGv = filtered_dfGv['Gender'].value_counts().to_dict()
    spending_countsGv = filtered_dfGv['How much are you willing to spend for going abroad?'].value_counts(
    ).to_dict()

    data_dict = {
        'gender_countsGTa': gender_countsGTa,
        'spending_countsGTa': spending_countsGTa,
        'gender_countsGTe': gender_countsGTe,
        'spending_countsGTe': spending_countsGTe,
        'gender_countsGv': gender_countsGv,
        'spending_countsGv': spending_countsGv,
    }

    json_data = {
        'data': data_dict,
        'abbv': abbv,
        'totaluniGv': len(filtered_dfGv),
        'totaluniGTe': len(filtered_dfGTe),
        'totaluniGTa': len(filtered_dfGTa)
    }
    return json_data


@app.get("/ODM")
async def read_odm():
    df = Functions.FetchFromSheetsODM()
    result = {}
    for month, group in df.groupby("Months"):
        month_dict = group.drop("Months", axis=1).to_dict(orient="records")[0]
        result[str(month)] = month_dict
    return result


@app.get('/login')
async def login(password: str):
    if password == 'Alan watss2024':
        return {'message': 'Login successful'}
    else:
        return {'message': 'Invalid password'}
