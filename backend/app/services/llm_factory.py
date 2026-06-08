from app.config import settings

def get_llm(temperature: float = 0.3):
    """
    Factory to return the selected LLM based on configuration settings.
    Supports OpenAI and Google Generative AI (Gemini).
    """
    provider = settings.MODEL_PROVIDER.lower()
    
    if provider == "google":
        try:
            from langchain_google_genai import ChatGoogleGenerativeAI
            # Use GOOGLE_API_KEY from settings
            return ChatGoogleGenerativeAI(
                model=settings.LLM_MODEL or "gemini-2.0-flash",
                temperature=temperature,
                google_api_key=settings.GOOGLE_API_KEY
            )
        except ImportError:
            raise ImportError(
                "Could not import langchain_google_genai. "
                "Please install it using 'pip install langchain-google-genai'."
            )
            
    elif provider == "openai":
        try:
            from langchain_openai import ChatOpenAI
            return ChatOpenAI(
                model=settings.LLM_MODEL or "gpt-4o-mini",
                temperature=temperature,
                openai_api_key=settings.OPENAI_API_KEY
            )
        except ImportError:
            raise ImportError(
                "Could not import langchain_openai. "
                "Please install it using 'pip install langchain-openai'."
            )
            
    else:
        # Fallback or default
        from langchain_openai import ChatOpenAI
        return ChatOpenAI(
            model="gpt-4o-mini",
            temperature=temperature,
            openai_api_key=settings.OPENAI_API_KEY
        )
