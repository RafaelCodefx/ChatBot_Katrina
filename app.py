from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

# Configurar a API do modelo
genai.configure(api_key="AIzaSyATyD_MhRf6etwzGBi5HgD0M6UN6-t1xk0")

app = Flask(__name__)
CORS(app)

@app.route('/generate', methods=['POST'])
def generate_content():
    # Obter o texto da solicitação
    data = request.get_json()
    prompt = data.get('prompt', '')

    # Criar o modelo e gerar o conteúdo
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(prompt)
    
    # Obter o texto gerado
    generated_text = response.text

    # Retornar o texto gerado como JSON
    return jsonify({'text': generated_text})

if __name__ == '__main__':
    app.run(debug=True)
