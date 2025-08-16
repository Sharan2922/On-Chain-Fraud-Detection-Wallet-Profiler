from loguru import logger
import sys

logger.remove()
logger.add(sys.stdout, level="INFO", backtrace=True, diagnose=False,
           format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level}</level> | <cyan>{message}</cyan>")
