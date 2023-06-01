import sys
import random
import pickle
# import sklearn from pickle
import numpy as np
mymodel = pickle.load(open('model.pkl','rb'))
LinearRegressionModel = pickle.load(open('LinearRegression.pkl','rb'))
LASSORegressionModel = pickle.load(open('LASSORegression.pkl','rb'))
AdaBoostModel = pickle.load(open('AdaBoost.pkl','rb'))

# height = int(sys.argv[1])
# base = int(sys.argv[2])
# ans = height*(random.randint(1,9))+base*(random.randint(0,9))
# output = ans.to_json()

temp1 = float(sys.argv[1])
temp2 = float(sys.argv[2])
temp3 = float(sys.argv[3])
mymodelname = str(sys.argv[4])

ip = np.array([temp1,temp2,temp3]).reshape(1,3)
ans = float(0)

if mymodelname=='LinearRegression':
    ans = round((LinearRegressionModel.predict(ip))[0][0],4)
elif mymodelname=='LASSORegression':
    ans = round((LASSORegressionModel.predict(ip))[0],4)
elif mymodelname=='AdaBoost':
    ans = round((AdaBoostModel.predict(ip))[0],4)
# LiReg_ans = round((LinearRegressionModel.predict(ip))[0][0],3)
# LASSO_ans = round((LASSORegressionModel.predict(ip))[0],3)
# AdaBoost_ans = round((AdaBoostModel.predict(ip))[0],3)

# ans = str(LiReg_ans)+'|'+str(LASSO_ans)+'|'+str(AdaBoost_ans)

print(ans)
# print(LASSO_ans[0])
# print(AdaBoost_ans[0])

sys.stdout.flush()

# print('hello world')