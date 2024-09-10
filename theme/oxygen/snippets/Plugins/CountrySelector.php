<?php 
$change = '';
if (isset($snippet['plunc:change'])) {
    $change = 'plunc-change="'.$snippet['plunc:change'].'"';
}

$model = '';
if (isset($snippet['plunc:model'])) {
    $model = 'plunc-model="'.$snippet['plunc:model'].'"';
}

$click = '';
if (isset($snippet['plunc:click'])) {
    $click = 'plunc-click="'.$snippet['plunc:click'].'"';
}
?>

<select <?php echo $change.' '.$model.' '.$click; ?> class="<?php echo $snippet['select:class']; ?>">
    <option class="<?php echo $snippet['options:class']; ?>" value="Afghanistan">Afghanistan</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Albania">Albania</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Algeria">Algeria</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Andorra">Andorra</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Angola">Angola</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Anguilla">Anguilla</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Antarctica">Antarctica</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Argentina">Argentina</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Armenia">Armenia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Aruba">Aruba</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Australia">Australia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Austria">Austria</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Azerbaijan">Azerbaijan</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Bahamas">Bahamas</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Bahrain">Bahrain</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Bangladesh">Bangladesh</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Barbados">Barbados</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Belarus">Belarus</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Belgium">Belgium</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Belize">Belize</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Benin">Benin</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Bermuda">Bermuda</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Bhutan">Bhutan</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Botswana">Botswana</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Brazil">Brazil</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="British Indian Ocean Territory">B.I. Ocean Terr.</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Bulgaria">Bulgaria</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Burkina Faso">Burkina Faso</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Burundi">Burundi</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Cambodia">Cambodia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Cameroon">Cameroon</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Canada">Canada</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Cape Verde">Cape Verde</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Cayman Islands">Cayman Islands</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Central African Republic">Central African Republic</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Chad">Chad</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Chile">Chile</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="China">China</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Christmas Island">Christmas Island</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Colombia">Colombia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Comoros">Comoros</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Cook Islands">Cook Islands</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Costa Rica">Costa Rica</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Croatia">Croatia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Cuba">Cuba</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Cyprus">Cyprus</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Denmark">Denmark</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Djibouti">Djibouti</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Dominica">Dominica</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Dominican Republic">Dominican Republic</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Ecuador">Ecuador</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Egypt">Egypt</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="El Salvador">El Salvador</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Equatorial Guinea">Equatorial Guinea</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Eritrea">Eritrea</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Estonia">Estonia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Ethiopia">Ethiopia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Faroe Islands">Faroe Islands</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Fiji">Fiji</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Finland">Finland</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="France">France</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="French Guiana">French Guiana</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="French Polynesia">French Polynesia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Gabon">Gabon</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Gambia">Gambia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Georgia">Georgia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Germany">Germany</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Ghana">Ghana</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Gibraltar">Gibraltar</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Greece">Greece</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Greenland">Greenland</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Grenada">Grenada</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Guadeloupe">Guadeloupe</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Guam">Guam</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Guatemala">Guatemala</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Guernsey">Guernsey</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Guinea">Guinea</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Guinea-Bissau">Guinea-Bissau</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Guyana">Guyana</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Haiti">Haiti</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Honduras">Honduras</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Hungary">Hungary</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Iceland">Iceland</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="India">India</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Indonesia">Indonesia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Iraq">Iraq</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Ireland">Ireland</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Isle of Man">Isle of Man</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Israel">Israel</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Italy">Italy</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Jamaica">Jamaica</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Japan">Japan</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Jersey">Jersey</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Jordan">Jordan</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Kazakhstan">Kazakhstan</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Kenya">Kenya</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Kiribati">Kiribati</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Kuwait">Kuwait</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Kyrgyzstan">Kyrgyzstan</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Laos">Laos</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Latvia">Latvia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Lebanon">Lebanon</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Lesotho">Lesotho</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Liberia">Liberia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Liechtenstein">Liechtenstein</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Lithuania">Lithuania</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Luxembourg">Luxembourg</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Madagascar">Madagascar</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Malawi">Malawi</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Malaysia">Malaysia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Maldives">Maldives</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Mali">Mali</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Malta">Malta</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Marshall Islands">Marshall Islands</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Martinique">Martinique</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Mauritania">Mauritania</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Mauritius">Mauritius</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Mayotte">Mayotte</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Mexico">Mexico</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Moldova">Moldova</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Monaco">Monaco</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Mongolia">Mongolia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Montenegro">Montenegro</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Montserrat">Montserrat</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Morocco">Morocco</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Mozambique">Mozambique</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Namibia">Namibia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Nauru">Nauru</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Nepal">Nepal</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Netherlands">Netherlands</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="New Caledonia">New Caledonia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="New Zealand">New Zealand</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Nicaragua">Nicaragua</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Niger">Niger</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Nigeria">Nigeria</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Niue">Niue</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Norfolk Island">Norfolk Island</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Northern Mariana Islands">Northern Mariana Islands</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Norway">Norway</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Oman">Oman</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Pakistan">Pakistan</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Palau">Palau</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Panama">Panama</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Papua New Guinea">Papua New Guinea</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Paraguay">Paraguay</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Peru">Peru</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Philippines">Philippines</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Poland">Poland</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Portugal">Portugal</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Puerto Rico">Puerto Rico</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Qatar">Qatar</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Romania">Romania</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Russia">Russia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Rwanda">Rwanda</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Samoa">Samoa</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="San Marino">San Marino</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Saudi Arabia">Saudi Arabia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Senegal">Senegal</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Serbia">Serbia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Seychelles">Seychelles</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Sierra Leone">Sierra Leone</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Singapore">Singapore</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Slovakia">Slovakia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Slovenia">Slovenia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Solomon Islands">Solomon Islands</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Somalia">Somalia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="South Africa">South Africa</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="South Sudan">South Sudan</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Spain">Spain</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Sri Lanka">Sri Lanka</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Sudan">Sudan</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Suriname">Suriname</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Sweden">Sweden</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Switzerland">Switzerland</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Taiwan">Taiwan</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Tajikistan">Tajikistan</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Thailand">Thailand</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Timor-Leste">Timor-Leste</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Togo">Togo</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Tokelau">Tokelau</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Tonga">Tonga</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Tunisia">Tunisia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Turkey">Turkey</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Turkmenistan">Turkmenistan</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Tuvalu">Tuvalu</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Uganda">Uganda</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Ukraine">Ukraine</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="United Arab Emirates">United Arab Emirates</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="United Kingdom">United Kingdom</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="United States">United States</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Uruguay">Uruguay</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Uzbekistan">Uzbekistan</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Vanuatu">Vanuatu</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Vietnam">Vietnam</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Yemen">Yemen</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Zambia">Zambia</option>
    <option class="<?php echo $snippet['options:class']; ?>" value="Zimbabwe">Zimbabwe</option>
</select>
